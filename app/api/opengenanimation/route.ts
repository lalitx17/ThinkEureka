import { NextResponse } from "next/server";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import prisma from "@/lib/prisma";
import { prompt } from "@/lib/prompt";

// Sanitize JSON function
function sanitizeJson(jsonString: string): string {
  return jsonString
    .replace(/[\x00-\x1F\x7F]/g, "") // Remove control characters
    .replace(/\\n/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Collapse multiple whitespaces
    .trim();
}

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  // Explicitly check environment variables
  const endpoint = process.env.OPENAI_INFERENCE_ENDPOINT;
  const apiKey = process.env.OPENAI_API_KEY;
  const modelName = process.env.OPENAI_MODEL_NAME;

  // Validate environment variables
  if (!endpoint) {
    return NextResponse.json(
      { error: "OPENAI_INFERENCE_ENDPOINT is not set" },
      { status: 500 },
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not set" },
      { status: 500 },
    );
  }

  if (!modelName) {
    return NextResponse.json(
      { error: "OPENAI_MODEL_NAME is not set" },
      { status: 500 },
    );
  }

  try {
    // Parse request body
    const { query } = await req.json();
    console.log("Received query:", query);

    // Create Azure client
    const client = ModelClient(endpoint, new AzureKeyCredential(apiKey));

    // Send request to Azure
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant." },

          { role: "user", content: prompt(query) },
        ],
        max_tokens: 1000,
        model: modelName,
        temperature: 0.1,
      },
    });

    console.log("response.body :", response.body);

    // Check response
    if (!response || !response.body || !response.body.choices) {
      return NextResponse.json(
        { error: "Invalid Azure API response" },
        { status: 500 },
      );
    }

    // Extract content
    const content = response.body.choices[0].message.content;
    console.log("Raw API response:", content);

    // JSON parsing with multiple strategies
    let parsedData;
    try {
      // First, try basic sanitization
      parsedData = JSON.parse(sanitizeJson(content));
    } catch (parseError) {
      try {
        // If first attempt fails, try more aggressive cleaning
        parsedData = JSON.parse(content.trim().replace(/[^\x20-\x7E]/g, ""));
      } catch (aggressiveCleanError) {
        console.error("JSON parsing failed:", parseError, aggressiveCleanError);
        console.log("Problematic JSON content:", content);

        return NextResponse.json(
          { error: "Could not parse JSON response" },
          { status: 500 },
        );
      }
    }

    // Validate parsed data
    if (!parsedData.title || !parsedData.category) {
      return NextResponse.json(
        { error: "Invalid JSON structure" },
        { status: 500 },
      );
    }

    // Create animation in database
    const newAnimation = await prisma.animationPost.create({
      data: {
        title: parsedData.title || `Animation about ${query}`,
        category: parsedData.category || "Computer Science",
        code: parsedData.code || "",
        description:
          parsedData.description ||
          `An interactive visualization about ${query}`,
        level: parsedData.level || "Beginner",
        thumbnail: "/placeholder.svg?height=200&width=300",
        likes: 0,
        AverageRating: 0,
        RatingCount: 0,
      },
    });

    // Prepare response data
    const animationData = {
      id: newAnimation.id,
      title: newAnimation.title,
      category: newAnimation.category,
      code: newAnimation.code,
      description: newAnimation.description,
      level: newAnimation.level,
      likes: newAnimation.likes,
      thumbnail: newAnimation.thumbnail,
      averageRating: newAnimation.AverageRating,
      ratingCount: newAnimation.RatingCount,
    };

    return NextResponse.json(animationData);
  } catch (error) {
    console.error("Comprehensive error:", error);

    // More detailed error response
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
