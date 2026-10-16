import { NextRequest, NextResponse } from "next/server";
import { buildAgentKnowledge } from "@/lib/ai/prompt";

const DEFAULT_MODEL = "@cf/meta/llama-3.1-8b-instruct-fp8";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const model = process.env.CLOUDFLARE_AI_MODEL || DEFAULT_MODEL;

    if (!accountId || !apiToken) {
      return NextResponse.json(
        {
          error:
            "Cloudflare Workers AI credentials missing. Please set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in your .env.local file.",
        },
        { status: 500 }
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    const systemPrompt = {
      role: "system",
      content: buildAgentKnowledge(),
    };

    const fullMessages = [systemPrompt, ...messages];

    // Using Cloudflare Workers AI official OpenAI-compatible chat completions endpoint
    const cfUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/v1/chat/completions`;

    const cfResponse = await fetch(cfUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: fullMessages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    const data = await cfResponse.json();

    if (!cfResponse.ok || data.errors?.length) {
      const errorMessage =
        data.errors?.[0]?.message ||
        data.messages?.[0]?.message ||
        "Cloudflare Workers AI call failed";
      return NextResponse.json({ error: errorMessage }, { status: cfResponse.status || 500 });
    }

    const replyContent =
      data.choices?.[0]?.message?.content ||
      data.result?.response ||
      "I'm ready to help you plan your Himalayan trip!";

    return NextResponse.json({
      role: "assistant",
      content: replyContent,
      model,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("AI Agent Route Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
