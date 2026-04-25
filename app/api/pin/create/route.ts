import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? "";

  if (!baseUrl) {
    return NextResponse.json(
      { success: false, error: "API base URL not configured." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();

    console.log("[PIN Proxy] Forwarding request to:", baseUrl);
    console.log("[PIN Proxy] Request body:", JSON.stringify(body, null, 2));

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "x-api-key": apiKey } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log("[PIN Proxy] Response status:", response.status);
    console.log("[PIN Proxy] Response data:", JSON.stringify(data, null, 2));

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("[PIN Proxy] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to reach API." },
      { status: 502 }
    );
  }
}
