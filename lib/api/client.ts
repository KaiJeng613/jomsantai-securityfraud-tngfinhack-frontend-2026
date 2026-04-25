import { API_CONFIG, buildURL } from './config';

// API Response type
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Logger utility
const logger = {
  info: (message: string, data?: any) => {
    console.log(`[API Client] ${message}`, data || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[API Client ERROR] ${message}`, error || '');
  },
  request: (method: string, url: string, body?: any) => {
    console.log(`[API Request] ${method} ${url}`);
    if (body) {
      console.log('[API Request Body]', JSON.stringify(body, null, 2));
    }
  },
  response: (status: number, data: any) => {
    console.log(`[API Response] Status: ${status}`);
    console.log('[API Response Data]', JSON.stringify(data, null, 2));
  },
};

// API Client class
class ApiClient {
  private baseURL: string;
  private apiKey: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.apiKey = API_CONFIG.apiKey;
    this.timeout = API_CONFIG.timeout;
    
    logger.info('API Client initialized', {
      baseURL: this.baseURL,
      apiKey: this.apiKey ? `${this.apiKey.substring(0, 10)}...` : 'NOT SET',
      timeout: this.timeout,
    });
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = buildURL(endpoint);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    logger.request(options.method || 'GET', url, options.body);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      
      logger.response(response.status, data);

      if (!response.ok) {
        logger.error(`Request failed with status ${response.status}`, data);
        return {
          success: false,
          error: data.error || 'Request failed',
          message: data.message,
        };
      }

      logger.info('Request successful');
      return {
        success: true,
        data,
      };
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        logger.error('Request timeout');
        return {
          success: false,
          error: 'Request timeout',
        };
      }

      logger.error('Network error', error);
      return {
        success: false,
        error: error.message || 'Network error',
      };
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  // POST request
  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  // PUT request
  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
