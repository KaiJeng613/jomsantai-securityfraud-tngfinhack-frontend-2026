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
  // PenipuMY API disabled — no API key configured.
  // Always returns safe/not-flagged result.
  console.log("[PenipuMY] Lookup disabled (no API key). Skipping check for:", phone);
  return {
    success: true,
    flagged: false,
    query: phone,
    count: 0,
    results: [],
  };
};
