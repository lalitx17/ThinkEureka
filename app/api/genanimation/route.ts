import { NextResponse } from "next/server";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
const endpoint = process.env.AZURE_INFERENCE_ENDPOINT!;
const modelName = process.env.AZURE_MODEL_NAME!;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    console.log(query);

    const prompt = `Create an educational animation about "${query}". Respond with JSON containing these fields:
1. title: A concise, engaging title for the animation
2. category: One of these categories - Mathematics, Physics, Computer Science, Economics, or Psychology
3. description: A brief description of what the animation demonstrates (2-3 sentences)
4. code: The React/TSX code to create this animation
5. level: One of these levels - Beginner, Intermediate, or Advanced

Format your response as valid JSON without explanation text or thinking.`;

    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(process.env.AZURE_API_KEY!),
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 100000,
        model: modelName,
        temperature: 0.2,
      },
    });

    if (!response) {
      return NextResponse.json(
        { error: "Azure API request failed" },
        { status: 500 },
      );
    }

    const content = response.body.choices[0].message.content;
    console.log("Raw API response:", content);

    const jsonRegex = /\{[\s\S]*\}/;
    const jsonMatch = content.match(jsonRegex);

    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const parsedData = JSON.parse(jsonMatch[0].trim());

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
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
