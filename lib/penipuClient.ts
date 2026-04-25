export type PenipuLookupMatch = {
  profile_id: string;
  name: string;
  total_reports: number;
  total_loss_myr: number;
  last_updated?: string;
};

export type PenipuLookupResponse = {
  success: boolean;
  flagged?: boolean;
  query?: string;
  count?: number;
  results?: PenipuLookupMatch[];
  error?: string;
};

export const lookupPenipuPhone = async (
  phone: string,
): Promise<PenipuLookupResponse> => {
  const response = await fetch(`/api/penipu/phone?q=${encodeURIComponent(phone)}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = (await response.json()) as PenipuLookupResponse;

  if (!response.ok) {
    return {
      success: false,
      error: data.error ?? "PenipuMY lookup failed.",
    };
  }

  return data;
};
