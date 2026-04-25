import { apiClient, ApiResponse } from './client';
import { API_CONFIG } from './config';

// PIN Service Types
export interface CreatePinRequest {
  userId: string;
  pin: string;
}

export interface VerifyPinRequest {
  userId: string;
  pin: string;
}

export interface UpdatePinRequest {
  userId: string;
  oldPin: string;
  newPin: string;
}

export interface ResetPinRequest {
  userId: string;
  verificationCode: string;
  newPin: string;
}

export interface PinResponse {
  userId: string;
  success: boolean;
  message?: string;
}

// PIN Service API calls
export const pinService = {
  // Create a new PIN
  createPin: async (data: CreatePinRequest): Promise<ApiResponse<PinResponse>> => {
    return apiClient.post<PinResponse>(API_CONFIG.endpoints.pin.create, data);
  },

  // Verify PIN
  verifyPin: async (data: VerifyPinRequest): Promise<ApiResponse<PinResponse>> => {
    return apiClient.post<PinResponse>(API_CONFIG.endpoints.pin.verify, data);
  },

  // Update existing PIN
  updatePin: async (data: UpdatePinRequest): Promise<ApiResponse<PinResponse>> => {
    return apiClient.put<PinResponse>(API_CONFIG.endpoints.pin.update, data);
  },

  // Reset PIN
  resetPin: async (data: ResetPinRequest): Promise<ApiResponse<PinResponse>> => {
    return apiClient.post<PinResponse>(API_CONFIG.endpoints.pin.reset, data);
  },
};

// Example usage:
/*
import { pinService } from '@/lib/api/pinService';

// Create PIN
const result = await pinService.createPin({
  userId: '12345',
  pin: '1234',
});

if (result.success) {
  console.log('PIN created:', result.data);
} else {
  console.error('Error:', result.error);
}
*/
