import { NextResponse } from "next/server";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

export const dynamic = "force-dynamic";

const endpoint = process.env.AZURE_INFERENCE_ENDPOINT!;
const modelName = process.env.AZURE_MODEL_NAME!;

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    console.log(query);

    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(process.env.AZURE_API_KEY!),
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "user",
            content: query,
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

    // First check for thinking/answer format
    const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>\s*([\s\S]*)/);

    if (thinkMatch) {
      const [, thinking, answer] = thinkMatch;

      // Extract JSX/TSX code from the answer
      const codeMatch = answer.match(/```(?:jsx|tsx)\s*([\s\S]*?)```/);
      const jsxCode = codeMatch ? codeMatch[1].trim() : null;

      return NextResponse.json({
        thinking: thinking.trim(),
        answer: jsxCode || answer.trim(),
      });
    } else {
      // If no thinking/answer format, try to extract JSX/TSX directly
      const codeMatch = content.match(/```(?:jsx|tsx)\s*([\s\S]*?)```/);
      const jsxCode = codeMatch ? codeMatch[1].trim() : null;

      return NextResponse.json({
        answer: jsxCode || content.trim(),
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
