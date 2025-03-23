import { NextResponse } from "next/server";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { v4 as uuidv4 } from 'uuid'; // You may need to install this package

export const dynamic = "force-dynamic";
const endpoint = process.env.AZURE_INFERENCE_ENDPOINT!;
const modelName = process.env.AZURE_MODEL_NAME!;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    console.log(query);
    
    // Create prompt that asks for specific fields
    const prompt = `Create an educational animation about "${query}". Respond with JSON containing these fields:
1. title: A concise, engaging title for the animation
2. category: One of these categories - Mathematics, Physics, Computer Science, Economics, or Psychology
3. description: A brief description of what the animation demonstrates (2-3 sentences)
4. code: The React/TSX code to create this animation

Format your response as valid JSON without explanation text or thinking. Example:
{
  "title": "Example Title",
  "category": "Physics",
  "description": "Example description.",
  "code": "import React from 'react'; // TSX code here"
}`;

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
    
    try {
      // Look for a complete JSON object in the content
      const jsonRegex = /(\{[\s\S]*\})/;
      const jsonMatch = content.match(jsonRegex);
      
      if (jsonMatch) {
        // We found a JSON object, try to parse it
        const jsonContent = jsonMatch[0].trim();
        try {
          const parsedData = JSON.parse(jsonContent);
          
          // Create AnimationData object
          const animationData = {
            id: uuidv4(), // Generate a unique ID
            title: parsedData.title || `Animation about ${query}`,
            category: parsedData.category || "Computer Science",
            code: parsedData.code || "",
            description: parsedData.description || `An interactive visualization about ${query}`,
            // Set default values for other fields
            likes: 0,
            comments: 0,
            thumbnail: "/placeholder.svg?height=200&width=300",
            averageRating: 0,
            ratingCount: 0
          };
          
          return NextResponse.json(animationData);
        } catch (innerParseError) {
          console.error("Error parsing extracted JSON:", innerParseError);
          throw innerParseError; // Pass to fallback extraction
        }
      }
      
      // If we're here, either no JSON object was found or parsing failed
      throw new Error("No valid JSON found in response");
      
    } catch (parseError) {
      console.error("Error parsing JSON from AI response:", parseError);
      
      // Fallback - try to extract data with regex if JSON parsing fails
      const titleMatch = content.match(/["']title["']?\s*:\s*["']([^"']+)["']/);
      const categoryMatch = content.match(/["']category["']?\s*:\s*["']([^"']+)["']/);
      const descriptionMatch = content.match(/["']description["']?\s*:\s*["']([^"']+)["']/);
      
      // More robust code extraction
      let codeContent = "";
      const codeBlockMatch = content.match(/["']code["']?\s*:\s*["']([\s\S]*?)["'](?=\s*[,}])/);
      const backticksMatch = content.match(/```(?:jsx|tsx)?\s*([\s\S]*?)```/);
      
      if (codeBlockMatch) {
        // Extract code from JSON property
        codeContent = codeBlockMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
      } else if (backticksMatch) {
        // Extract code from code block
        codeContent = backticksMatch[1];
      }
      
      // Create AnimationData with extracted or default values
      const animationData = {
        id: uuidv4(), // Generate a unique ID
        title: titleMatch ? titleMatch[1] : `Animation about ${query}`,
        category: categoryMatch ? categoryMatch[1] : "Computer Science",
        code: codeContent || "",
        description: descriptionMatch ? descriptionMatch[1] : `An interactive visualization about ${query}`,
        // Set default values for other fields
        likes: 0,
        comments: 0,
        thumbnail: "/placeholder.svg?height=200&width=300",
        averageRating: 0,
        ratingCount: 0
      };
      
      return NextResponse.json(animationData);
    }
    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}