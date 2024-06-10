import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TokenService } from './token.lib';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = TokenService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try{
      const res = await this.axiosInstance.get(url, config);
      return res.data;
    } catch (error){
      throw this.handleError(error)
    }
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {

    try {
      const res = await this.axiosInstance.post(url, data, config);
      return res.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const res = await this.axiosInstance.put(url, data, config);
      return res.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'API Error');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an error
      throw new Error('API Error');
    }
  }
}

const apiService = new ApiService();

export default apiService;