import { apiClient, ApiResponse } from "./client";
import { API_CONFIG } from "./config";

export interface DeviceInfo {
  platform: string;
  os_version: string;
  device_model: string;
}

export interface LocationInfo {
  country_code: string;
  latitude: number;
  longitude: number;
}

export interface KeystrokeDynamics {
  pin_length: number;
  inter_key_delays_ms: number[];
  hold_durations_ms: number[];
  total_entry_duration_ms: number;
}

export interface CreatePinRequest {
  session_id: string;
  user_id: string;
  device: DeviceInfo;
  location: LocationInfo;
  keystroke_dynamics: KeystrokeDynamics;
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
  userId?: string;
  success: boolean;
  message?: string;
}

export const pinService = {
  createPin: async (data: CreatePinRequest): Promise<ApiResponse<PinResponse>> => {
    // Use local API proxy to avoid CORS issues
    try {
      console.log("[pinService] Sending PIN create request via proxy...");
      const response = await fetch("/api/pin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("[pinService] Proxy response:", result);

      if (!response.ok) {
        return {
          success: false,
          error: result.error || "Request failed",
          message: result.message,
        };
      }

      return { success: true, data: result };
    } catch (error: any) {
      console.error("[pinService] Error:", error);
      return { success: false, error: error.message || "Network error" };
    }
  },

  verifyPin: async (data: VerifyPinRequest): Promise<ApiResponse<PinResponse>> => {
    return apiClient.post<PinResponse>(API_CONFIG.endpoints.pin.verify, data);
  },

  updatePin: async (data: UpdatePinRequest): Promise<ApiResponse<PinResponse>> => {
    return apiClient.put<PinResponse>(API_CONFIG.endpoints.pin.update, data);
  },

  resetPin: async (data: ResetPinRequest): Promise<ApiResponse<PinResponse>> => {
    return apiClient.post<PinResponse>(API_CONFIG.endpoints.pin.reset, data);
  },
};
