import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: { "Content-Type": "application/json" },
});

export const api = <T>(config: any) => {
    return instance.request<T>(config);
};
