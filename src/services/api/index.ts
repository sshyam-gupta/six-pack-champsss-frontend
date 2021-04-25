import axios from 'axios';
import { signOut } from 'next-auth/client';

axios.interceptors.request.use(
  config => {
    //TODO Add token here.
    const token = '';
    config.headers = {
      ...config.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return {
      ...config,
    };
  },
  error => {
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      signOut();
      return;
    }
    throw err;
  },
);

class ApiService {
  static async post(path: string, params: any = {}, headers?: any) {
    return this.xhr(path, params, headers, 'POST');
  }
  static async get(path: string, params: any = {}, headers?: any) {
    return this.xhr(path, params, headers, 'GET');
  }
  private static async xhr(path: string, params: any = {}, _headers: any = {}, method = 'GET') {
    const config: any = {
      method,
      data: params,
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    };
    config.url = path;
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
