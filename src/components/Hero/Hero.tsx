import { WeatherData } from "../../types/weather.types";
import { Texts } from "../../texts/texts";
import { WeatherEnum } from "../../utils/weather-enum.utils";
import styles from "./Hero.module.scss";
import { Commons } from "../../utils/commons.utils";
import { useSkeleton } from "../../hooks/skeleton";
import { useMemo } from "react";

export interface HeroProps {
    data: WeatherData;
    isLoading?: boolean;
}

export function Hero({ data, isLoading }: HeroProps) {
    const date = new Date();
    const { weekday, datetime } = Commons.formatDateTime(date);
    const ref = useSkeleton(isLoading ?? false)

    const info = useMemo(() => {
            const weatherEnum = WeatherEnum.getEnum(data?.name ? data.weather[0].icon : '');
            const title = Texts.weather(weatherEnum);
            const description = Texts.weatherDescription(weatherEnum);
            const temp = `${data?.main?.temp.toFixed(1)}°`;
        
        return {
            title,
            description,
            temp,
        };
    }, [data]);

    return (
        <span ref={ref} className={styles['weather-hero']}>
            <h1 data-testid="hero-temp">{info.temp}</h1>
            <h2 data-testid="hero-title">{info.title}</h2>
            <div className={styles['weather-hero__date']}>
                <span data-testid="hero-weekday">{`${data.name}, ${weekday}`}</span>
                <span data-testid="hero-datetime">{datetime}</span>
            </div>
            <p data-testid="hero-description">{info.description}</p>
        </span>
    );
}
