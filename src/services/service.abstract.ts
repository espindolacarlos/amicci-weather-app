import { AxiosInstance, AxiosResponse } from "axios";
import axiosInstance from "../instance/axios.instance";

type RequestMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestConfig<RequestT> {
    method: RequestMethods;
    url: string;
    params?: RequestT;
}

export abstract class Service {
    instance: AxiosInstance;
    constructor(baseUrl: string) {
        this.instance = axiosInstance(baseUrl);
    }

    /**
     * 
     * @param config RequestConfig<RequestT>
     * @description This function makes an HTTP request using the provided configuration.
     * @returns Promise<AxiosResponse<ResponseT>>
     */
    async request<ResponseT = void, RequestT = void>(config: RequestConfig<RequestT>): Promise<AxiosResponse<ResponseT>> {
        return await this.instance.request<ResponseT>({
            method: config.method,
            url: config.url,
            params: config.params,
        });
    }
}