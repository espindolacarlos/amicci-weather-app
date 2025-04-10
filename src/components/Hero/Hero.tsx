import { WeatherData } from "../../types/weather.types";
import { Texts } from "../../texts/texts";
import { WeatherEnum } from "../../utils/weather-enum.utils";
import styles from "./Hero.module.scss";
import { Commons } from "../../utils/commons.utils";
import { useSkeleton } from "../../hooks/skeleton";
import { useMemo } from "react";

interface WeatherHeroProps {
    data: WeatherData;
    isLoading?: boolean;
}

export function Hero({ data, isLoading }: WeatherHeroProps) {
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
            <h1>{info.temp}</h1>
            <h2>{info.title}</h2>
            <div className={styles['weather-hero__date']}>
                <span>{`${data.name}, ${weekday}`}</span>
                <span>{datetime}</span>
            </div>
            <p>{info.description}</p>
        </span>
    );
}
