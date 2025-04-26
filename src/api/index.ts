import axios from "axios";

import baseURL from "./baseUrl";

const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
});

type ApiOptions = {
    data?: object,
    method?: "get" | "post" | "put" | "delete",
    params?: object,
}

export const api = async (url: string, options: ApiOptions = {}) => {
    const { data, method = "get", params } = options;

    const accessToken = 'ACCESS_TOKEN'; // Replace with actual access token retrieval logic

    try {
        const response = await axiosInstance.request({
            url,
            method,
            data,
            params,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            responseType: "json",
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.errors);
    }
}

export default api;