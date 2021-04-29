import axios from 'axios';
import { signOut } from 'next-auth/client';

axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      signOut();
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem('token');
      }
      return;
    }
    throw err;
  },
);

class ApiService {
  static async post(path: string, params: any = {}, headers?: any) {
    return this.xhr(path, params, headers, 'POST');
  }
  static async put(path: string, params: any = {}, headers?: any) {
    return this.xhr(path, params, headers, 'PUT');
  }
  static async get(path: string, params: any = {}, headers?: any) {
    return this.xhr(path, params, headers, 'GET');
  }
  static async delete(path: string, params: any = {}, headers?: any) {
    return this.xhr(path, params, headers, 'DELETE');
  }
  private static async xhr(path: string, params: any = {}, _headers: any = {}, method = 'GET') {
    const config: any = {
      method,
      data: params,
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    };

    config.url = path;
    config.headers = {
      ...config.headers,
      ...(typeof window !== 'undefined' ? { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` } : {}),
      ..._headers,
    };
    config.timeout = 30000;
    let response: any = {};

    try {
      response = await axios(config);
    } catch (error) {
      const { response: errorResponse, code, message, Message } = error;
      if (errorResponse) {
        const { data, ...errorConfig } = errorResponse;
        let error = data;
        if (!data.Message && data.error_description) {
          error = {
            ...data,
            Message: data.error_description || 'Something went wrong!',
          };
        }
        response = { ...errorConfig, error };
      } else {
        let errorMessage = message || Message;
        if (code === 'ECONNABORTED') {
          errorMessage = 'Network timed out. Please try again.';
        }
        response = { error: { Message: errorMessage } };
      }
    }

    return response;
  }
}
export default ApiService;
