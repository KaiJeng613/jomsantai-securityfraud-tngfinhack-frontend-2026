// API Configuration for AWS Lambda endpoints
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
  endpoints: {
    pin: {
      create: process.env.NEXT_PUBLIC_PIN_CREATE_ENDPOINT || '/pin/create',
      verify: process.env.NEXT_PUBLIC_PIN_VERIFY_ENDPOINT || '/pin/verify',
      update: process.env.NEXT_PUBLIC_PIN_UPDATE_ENDPOINT || '/pin/update',
      reset: process.env.NEXT_PUBLIC_PIN_RESET_ENDPOINT || '/pin/reset',
    },
  },
  timeout: 30000, // 30 seconds
};

// Helper to build full URL
export const buildURL = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};
