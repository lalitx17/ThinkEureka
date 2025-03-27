import { NextResponse } from "next/server";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { prisma } from "@/lib/prisma";
import { prompt } from "@/lib/prompt";

export const dynamic = "force-dynamic";

// Sanitize JSON function
function sanitizeJson(jsonString: string): string {
  return jsonString
    .replace(/[\x00-\x1F\x7F]/g, "") // Remove control characters
    .replace(/\\n/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Collapse multiple whitespaces
    .trim();
}

export async function POST(req: Request) {
  try {
    // Validate environment variables
    if (!process.env.AZURE_INFERENCE_ENDPOINT) {
      throw new Error("AZURE_INFERENCE_ENDPOINT is not set");
    }
    if (!process.env.AZURE_API_KEY) {
      throw new Error("AZURE_API_KEY is not set");
    }
    if (!process.env.AZURE_MODEL_NAME) {
      throw new Error("AZURE_MODEL_NAME is not set");
    }

    const endpoint = process.env.AZURE_INFERENCE_ENDPOINT;
    const modelName = process.env.AZURE_MODEL_NAME;

    // Parse request body
    const { query } = await req.json();
    console.log("Received query:", query);

    // Create Azure client
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(process.env.AZURE_API_KEY),
    );

    // Send request to Azure
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "user",
            content: prompt(query),
          },
        ],
        max_tokens: 100000,
        model: modelName,
        temperature: 0.2,
      },
    });

    // Check response
    if (!response) {
      return NextResponse.json(
        { error: "Azure API request failed" },
        { status: 500 },
      );
    }

    // Extract content
    const content = response.body.choices[0].message.content;
    console.log("Raw API response:", content);

    // JSON extraction with multiple parsing strategies
    const jsonRegex = /\{[\s\S]*\}/;
    const jsonMatch = content.match(jsonRegex);

    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    // Try parsing with multiple strategies
    let parsedData;
    try {
      // First, try basic sanitization
      parsedData = JSON.parse(sanitizeJson(jsonMatch[0].trim()));
    } catch (parseError) {
      try {
        // If first attempt fails, try more aggressive cleaning
        parsedData = JSON.parse(
          jsonMatch[0].trim().replace(/[^\x20-\x7E]/g, ""), // Remove all non-printable characters
        );
      } catch (aggressiveCleanError) {
        console.error("JSON parsing failed:", parseError, aggressiveCleanError);

        // Log the problematic content for debugging
        console.log("Problematic JSON content:", jsonMatch[0]);

        throw new Error("Could not parse JSON response");
      }
    }

    // Validate parsed data
    if (!parsedData.title || !parsedData.category) {
      throw new Error("Invalid JSON structure");
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
        comments: 0,
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
      comments: newAnimation.comments,
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
