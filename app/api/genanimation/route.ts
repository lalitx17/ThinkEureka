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
    const match = content.match(/<think>([\s\S]*?)<\/think>\s*([\s\S]*)/);

    if (match) {
      const [, thinking, answer] = match;
      return NextResponse.json({
        thinking: thinking.trim(),
        answer: answer.trim(),
      });
    } else {
      return NextResponse.json({ answer: content.trim() });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
