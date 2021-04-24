import isEmpty from 'lodash/isEmpty';
import { ApiHeaders } from './headers';
import axios from 'axios';

class ApiService {
  static async post(path: string, params: any = {}, headers?: any) {
    return this.xhr(path, params, headers, 'POST');
  }
  static async get(path: string, params: any = {}, headers?: any) {
    return this.xhr(path, params, headers, 'GET');
  }
  private static async xhr(path: string, params: any = {}, headers: any = {}, method = 'GET') {
    const config: any = {
      method,
      data: params,
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    };
    config.headers = isEmpty(headers) ? ApiHeaders.getHeaders() : headers;
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
