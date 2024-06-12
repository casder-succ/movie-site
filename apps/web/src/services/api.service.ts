// eslint-disable-next-line max-classes-per-file
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

import config from 'config';

export class ApiError extends Error {
  __proto__: ApiError;

  data: any;

  status: number;

  constructor(data: any, status = 500, statusText = 'Internal Server Error') {
    super(`${status} ${statusText}`);

    this.constructor = ApiError;
    this.__proto__ = ApiError.prototype; // eslint-disable-line no-proto

    this.name = this.constructor.name;
    this.data = data;
    this.status = status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const throwApiError = ({
  status,
  statusText,
  data,
}: any) => {
  console.error(`API Error: ${status} ${statusText}`, data); //eslint-disable-line
  throw new ApiError(data, status, statusText);
};

class ApiClient {
  _api: AxiosInstance;

  _handlers: Map<string, any>;

  constructor(axiosConfig: AxiosRequestConfig) {
    this._handlers = new Map();

    this._api = axios.create(axiosConfig);
    this._api.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      async (error) => {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          return this._handleRefreshToken(error);
        }

        return this._handleErrors(error);
      },
    );
  }

  async _handleRefreshToken(error: any): Promise<any> {
    await this._api.post('/session/refresh-token', undefined, error.config);
    return this._api(error.config);
  }

  _handleErrors(error: any) {
    if (axios.isCancel(error)) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw error;
    }
    // Axios Network Error & Timeout error don't have 'response' field
    // https://github.com/axios/axios/issues/383
    const errorResponse = error.response || {
      status: error.code,
      statusText: error.message,
      data: error.data,
    };

    const errorHandlers = this._handlers.get('error') || [];
    errorHandlers.forEach((handler: any) => {
      handler(errorResponse);
    });

    return throwApiError(errorResponse);
  }

  get(url: string, params: any = {}, requestConfig: AxiosRequestConfig<any> = {}): Promise<any> {
    return this._api({
      method: 'get',
      url,
      params,
      ...requestConfig,
    });
  }

  post(url: string, data: any = {}, requestConfig: AxiosRequestConfig<any> = {}): Promise<any> {
    return this._api({
      method: 'post',
      url,
      data,
      ...requestConfig,
    });
  }

  put(url: string, data: any = {}, requestConfig: AxiosRequestConfig<any> = {}): Promise<any> {
    return this._api({
      method: 'put',
      url,
      data,
      ...requestConfig,
    });
  }

  delete(url: string, data: any = {}, requestConfig: AxiosRequestConfig<any> = {}): Promise<any> {
    return this._api({
      method: 'delete',
      url,
      data,
      ...requestConfig,
    });
  }
}

export default new ApiClient({
  baseURL: config.API_URL,
  withCredentials: true,
  responseType: 'json',
  paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'brackets' }),
});
