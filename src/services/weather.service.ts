import { WeatherData, WeatherForecastResponse, WeatherParams } from "../types/weather.types";
import { Service } from "./service.abstract";

export class WeatherService extends Service {
    constructor() {
        super('https://api.openweathermap.org/data/2.5');
    }

    /**
     * 
     * @param city string
     * @returns Promise<WeatherData>
     * @description This function fetches the weather data for a given city using the OpenWeatherMap API.
     * It returns a promise that resolves to the weather data or rejects with an error message.
     */
    async getWeatherByCity(city: string) {
        return await this.request<WeatherData, WeatherParams>({
            method: "GET",
            url: "/weather",
            params: {
                q: city,
                appid: import.meta.env.VITE_WEATHER_API_KEY,
                units: 'metric',
                lang: 'pt_br',
            },
        });
    }

    /**
     * 
     * @param lat number
     * @param lon number
     * @returns Promise<WeatherData>
     * @description This function fetches the weather data for a given latitude and longitude using the OpenWeatherMap API.
     * It returns a promise that resolves to the weather data or rejects with an error message.
     */
    async getWeatherByCoordinates(lat: number, lon: number) {
        return await this.request<WeatherData, WeatherParams>({
            method: "GET",
            url: "/weather",
            params: {
                lat,
                lon,
                appid: import.meta.env.VITE_WEATHER_API_KEY,
                units: 'metric',
                lang: 'pt_br',
            },
        });
    }

    /**
     * 
     * @param lat number
     * @param lon number
     * @returns Promise<WeatherForecastResponse>
     * @description This function fetches the weather forecast for the next days for a given latitude and longitude using the OpenWeatherMap API.
     * It returns a promise that resolves to the weather forecast data or rejects with an error message.
     */
    async getWeatherNextDays(lat: number, lon: number) {
        return await this.request<WeatherForecastResponse, WeatherParams>({
            method: "GET",
            url: "/forecast",
            params: {
                lat,
                lon,
                appid: import.meta.env.VITE_WEATHER_API_KEY,
                units: 'metric',
                lang: 'pt_br',
            },
        })
    }
}