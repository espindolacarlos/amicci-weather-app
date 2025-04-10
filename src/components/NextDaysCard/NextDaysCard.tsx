import { Cloud, Sunny, Thunderstorm } from '@mui/icons-material';
import styles from './NextDaysCard.module.scss'
import { WeatherService } from '../../services/weather.service';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { WeatherForecastItemResponse } from '../../types/weather.types';
import { WeatherEnum } from '../../utils/weather-enum.utils';
import { useSkeleton } from '../../hooks/skeleton';
import { useNotifyStore } from '../../stores/notify.store';
import { Texts } from '../../texts/texts';

export interface NextDaysCardsProps {
    lon: number;
    lat: number;
    isLoading?: boolean;
}

interface NextDaysItem {
    weekDay: string;
    minTemp: number;
    maxTemp: number;
    icon: React.JSX.Element;
    rainMillimeters: number | null;
}

export default function NextDaysCard({ lon, lat, isLoading }: NextDaysCardsProps) {
    const weatherService = useMemo(() => new WeatherService(), []);
    const [forecastItems, setForecastItems] = useState<NextDaysItem[]>([]);
    const [localLoading, setLocalLoading] = useState(false);
    const ref = useSkeleton((isLoading || localLoading) ?? false);
    const { notify } = useNotifyStore();

    function getRainMillimeters(group: WeatherForecastItemResponse[]): number | null {
        const weatherEnum = WeatherEnum.getEnum(group[0].weather[0].icon);
        if (weatherEnum === 'rain' || weatherEnum === 'night_rain' || weatherEnum === 'thunderstorm' || weatherEnum === 'night_thunderstorm') {
            return group.reduce((sum, item) => sum + (item.rain ? item.rain['3h'] || 0 : 0), 0);
        }
        return null
    }

    function getForecastIcon(icon: string): React.JSX.Element {
        const weatherEnum = WeatherEnum.getEnum(icon);
        switch (weatherEnum) {
            case 'day_clear_sky':
            case 'night_clear_sky':
                return (
                     <Sunny className={styles['next-days-card__item-icon--sun']} />
                );
            case 'day_scattered_clouds':
            case 'night_scattered_clouds':
            case 'mist':
            case 'night_mist':
                return <Cloud />;
            case 'rain':
            case 'night_rain':
            case 'thunderstorm':
            case 'night_thunderstorm':
                return <Thunderstorm className={styles['next-days-card__item-icon--rain']} />;
            default:
                return <Cloud />;
        }
    }

    const getForecast = useCallback(() => {
        try {
            setLocalLoading(true);
            weatherService.getWeatherNextDays(lat, lon).then((response) => {
                const groupedItems: { [key: number]: WeatherForecastItemResponse[] } = response.data.list.reduce((acc: { [key: number]: WeatherForecastItemResponse[] }, item) => {
                    const date = new Date(item.dt * 1000).setHours(0, 0, 0, 0); // Group by day
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(item);
                    return acc;
                }, {});

                const formattedItems = Object.values(groupedItems).map((group: WeatherForecastItemResponse[]): NextDaysItem => {
                    const firstItem = group[0];
                    const date = new Date(firstItem.dt * 1000);
                    const weekDay = date.toLocaleDateString('pt-BR', { weekday: 'long' });
                    const minTemp = (Math.min(...group.map(item => item.main.temp_min))).toFixed(1);
                    const maxTemp = (Math.max(...group.map(item => item.main.temp_max))).toFixed(1);
                    const icon = getForecastIcon(group[0].weather[0].icon);
                    const rainMillimeters = getRainMillimeters(group);
                    return {
                        weekDay,
                        minTemp: parseFloat(minTemp),
                        maxTemp: parseFloat(maxTemp),
                        icon,
                        rainMillimeters,
                    };
                }).slice(0, 5);
                setForecastItems(formattedItems);
            });
        } catch (error) {
            console.error('Error fetching forecast data:', error);
            notify(Texts.nextDaysCards.notificationError.title, Texts.nextDaysCards.notificationError.description);
        } 
        finally {
            setTimeout(() => {
                setLocalLoading(false);
            }, 1000);
        }
    }, [weatherService, lon, lat, notify]);

    useEffect(() => {
        getForecast();
    }, [getForecast]);

    return (
        <section ref={ref} className={styles['next-days-card']}>
            { forecastItems.map((item, index) => (
            <article key={index} className={styles['next-days-card__item']}>
            <header className={styles['next-days-card__item-info']}>
                <h3 className={styles['next-days-card__item-weekday']}>
                {item.weekDay}
                </h3>
                <div className={styles['next-days-card__item-temp']}>
                <span>
                    Mín.: {item.minTemp.toFixed(1)}°
                </span>
                <span>
                    Máx.: {item.maxTemp.toFixed(1)}°
                </span>
                </div>
            </header>
            <div className={styles['next-days-card__item-icon']}>
                {item.icon}
                {item.rainMillimeters && (
                <span className={styles['next-days-card__item-rain']}>
                    {item.rainMillimeters.toFixed(0)}mm
                </span>
                )}
            </div>
            </article>
            )) }
        </section>
    )
}