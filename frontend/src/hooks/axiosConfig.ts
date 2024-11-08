import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://your-production-url.com'
  : 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_URL,},
);

export const setAuthHeader = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
};

export const axiosWithToken = (token?: string) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return axiosInstance;
};

export default axiosInstance;
