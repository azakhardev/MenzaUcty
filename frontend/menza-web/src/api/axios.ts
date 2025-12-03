import axios, {type AxiosRequestConfig} from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export const api = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    return instance.request({
        ...config,
        ...options,
    }).then((response) => response.data);
};