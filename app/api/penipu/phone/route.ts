import { NextRequest, NextResponse } from "next/server";

type PenipuSearchResult = {
  profile_id: string;
  name: string;
  total_reports: number;
  total_loss_myr: number;
  last_updated?: string;
};

type PenipuSearchResponse = {
  query: string;
  type: string;
  count: number;
  results: PenipuSearchResult[];
  error?: string;
};

const normalizePhoneQuery = (phone: string) => {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("60")) {
    return `0${digits.slice(2)}`;
  }

  return digits;
};

const parseJson = async <T>(response: Response): Promise<T | null> => {
  const body = await response.text();

  if (!body) {
    return null;
  }

  try {
    return JSON.parse(body) as T;
  } catch {
    return null;
  }
};

export async function GET(request: NextRequest) {
  const phone = request.nextUrl.searchParams.get("q") ?? "";
  const normalizedPhone = normalizePhoneQuery(phone);

  if (normalizedPhone.length < 3) {
    return NextResponse.json(
      { success: false, error: "A valid phone number is required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.PENIPU_API_KEY;
  const apiBaseUrl = process.env.PENIPU_API_BASE_URL ?? "https://penipu.my";

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error: "PenipuMY API key is not configured. Set PENIPU_API_KEY on the server.",
      },
      { status: 503 },
    );
  }

  const searchUrl = new URL("/api/v1/search", apiBaseUrl);
  searchUrl.searchParams.set("q", normalizedPhone);
  searchUrl.searchParams.set("type", "phone");
  searchUrl.searchParams.set("limit", "5");

  try {
    const response = await fetch(searchUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-Key": apiKey,
      },
      cache: "no-store",
    });

    const data = await parseJson<PenipuSearchResponse>(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data?.error ?? "PenipuMY lookup failed.",
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      flagged: Boolean(data?.count),
      query: normalizedPhone,
      count: data?.count ?? 0,
      results: data?.results ?? [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to reach PenipuMY right now.",
      },
      { status: 502 },
    );
  }
}
