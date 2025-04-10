import { useNavigate } from "react-router-dom";
import { useMapsStore } from "../../stores/maps.store";
import { ROUTES } from "../../constants/routes.constants";
import { useCallback, useEffect, useMemo, useState } from "react";
import PlaceAutocomplete from "../../components/PlaceAutocomplete/PlaceAutocomplete";
import { WeatherService } from "../../services/weather.service";
import { Url } from "../../utils/url.utils";
import { WeatherData } from "../../types/weather.types";
import styles from './Weather.module.scss';
import { IconButton } from "@mui/material";
import { AccessTime, Air, Cloud, Place, RemoveRedEyeOutlined, WaterDropOutlined } from "@mui/icons-material";
import { backgroundImage } from "../../constants/background-image.constants";
import { WeatherEnum } from "../../utils/weather-enum.utils";
import InformationCard from "../../components/InformationCard/InformationCard";
import { Texts } from "../../texts/texts";
import NextDaysCard from "../../components/NextDaysCard/NextDaysCard";
import { Hero } from "../../components/Hero/Hero";
import { useSkeleton } from "../../hooks/skeleton";
import { useNotifyStore } from "../../stores/notify.store";

export default function Weather() {
    const { geolocation, getCurrentLocation } = useMapsStore();
    const weatherService = useMemo(() => new WeatherService(), []);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isCurrentLocation, setIsCurrentLocation] = useState(false);
    const [weatherData, setWeatherData] = useState<WeatherData>({} as WeatherData);
    const ref = useSkeleton(isLoading ?? false);
    const { notify } = useNotifyStore();

    async function getDataByCoordinates(lat: number, lon: number) {
        try {
            setIsLoading(true);
            const response = await weatherService.getWeatherByCoordinates(lat, lon);
            if (response) {
                setWeatherData(response.data);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            notify(Texts.weatherPage.notificationError.title, Texts.weatherPage.notificationError.description);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGetCurrentLocation() {
        const location = await getCurrentLocation();
        if (location) {
            Url.setSearchParams({
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            });
            setWeatherData({} as WeatherData);
            getInitialData();
            getDataByCoordinates(
                location.coords.latitude,
                location.coords.longitude
            );
            setIsCurrentLocation(true);
        } else {
            navigate(ROUTES.HOME);
        }
    }

    async function getSearchData(searchTerm: string) {
        try {
            setIsLoading(true);
            const response = await weatherService.getWeatherByCity(searchTerm.split("-")[0]);
            if (response) {
                if (response.data?.coord.lat !== geolocation.coords?.latitude || response.data?.coord.lon !== geolocation.coords?.longitude) {
                    setIsCurrentLocation(false);
                }
                Url.setSearchParams({
                    lat: response?.data?.coord?.lat,
                    lon: response?.data?.coord?.lon,
                });
                setWeatherData(response.data);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            notify(Texts.weatherPage.notificationError.title, Texts.weatherPage.notificationError.description);
        } finally {
            setIsLoading(false);
        }
    }

    const firstColumnCards = useMemo(() => {
        const windSpeed = (weatherData.wind?.speed ?? 0) * 3.6;
        return [
            {
                title: "Vento",
                value: `${windSpeed.toFixed(2)} km/h`,
                description: `${Texts.wind(windSpeed)}`,
                icon: <Air />
            },
            {
                title: "Nuvens",
                value: `${weatherData.clouds?.all}%`,
                description: `${Texts.clouds(weatherData.clouds?.all ?? 0)}`,
                icon: <Cloud />
            }
        ]
    }, [weatherData])

    const secondColumnCards = useMemo(() => {
        const visibility = ((weatherData.visibility ?? 0) / 1000).toFixed(2)
        return [
            {
                title: "Visibilidade",
                value: `${visibility} km`,
                description: `${Texts.visibility(Number(visibility))}`,
                icon: <RemoveRedEyeOutlined />
            },
            {
                title: "Umidade",
                value: `${weatherData.main?.humidity}%`,
                description: `${Texts.humidity(weatherData.main?.humidity ?? 0)}`,
                icon: <WaterDropOutlined />
            },
            {
                title: "Pressão",
                value: `${weatherData.main?.pressure} hPa`,
                description: `${Texts.pressure(weatherData.main?.pressure ?? 0)}`,
                icon: <AccessTime />
            },
        ]
    }, [weatherData])

    
    const getInitialData = useCallback(async () => {
        const lat = Url.getSearchParams().lat ?? geolocation.coords?.latitude;
        const lon = Url.getSearchParams().lon ?? geolocation.coords?.longitude;
        if (!lat || !lon) {
            navigate(ROUTES.HOME);
            return;
        } 
        Url.setSearchParams({
            lat: geolocation.coords?.latitude,
            lon: geolocation.coords?.longitude,
        });
       getDataByCoordinates(Number(lat), Number(lon));
    }, [geolocation.coords, navigate, weatherService]);

    const getBackgroundImage = useMemo(() => {
        return backgroundImage[WeatherEnum.getEnumForBackgroundImage(weatherData.weather ? weatherData.weather[0]?.icon : '50d') as keyof typeof backgroundImage];
    }, [weatherData]);

    useEffect(() => {
        getInitialData();
    }, [getInitialData]);

    return (
        <div
            className={styles["page-weather"]}
            style={{
                backgroundImage: `url(${getBackgroundImage})`,
                backgroundSize: "cover",
            }}
        >
            <div className={`${styles[`page-weather__hero--${WeatherEnum.getEnumForBackgroundImage(weatherData.weather ? weatherData.weather[0]?.icon : '50d')}`]} ${styles['page-weather__hero']} ${styles['page-weather--mobile']}`}>
                <Hero isLoading={isLoading} data={weatherData} />
            </div>
            <div className={`${styles[`page-weather__details--${WeatherEnum.getEnumForBackgroundImage(weatherData.weather ? weatherData.weather[0]?.icon : '50d')}`]} ${styles['page-weather__details']}`}>
                <div className={styles["page-weather__details-search"]}>
                    <PlaceAutocomplete
                        className={styles["page-weather__details-search-autocomplete"]}
                        onSelect={(place) => getSearchData(place)}
                        isLoading={isLoading}
                    />
                    <span ref={ref}>
                        <IconButton
                            className={styles["page-weather__details-search-icon"]}
                            onClick={() => handleGetCurrentLocation()}
                            disabled={isLoading}
                            size="large"
                            color={isCurrentLocation ? "primary" : "default"}
                        >
                            <Place />
                        </IconButton>
                    </span>
                </div>
                <div className={styles["page-weather__details-info"]}>
                    <div className={styles["page-weather__details-info-col"]}>
                        <NextDaysCard isLoading={isLoading} lat={weatherData?.coord?.lat ?? 0} lon={weatherData?.coord?.lon ?? 0} />
                        <div className={styles["page-weather__details-info-row"]}>
                            {
                            firstColumnCards.map((card, index) => (
                                <InformationCard
                                    isLoading={isLoading}
                                    key={index}
                                    title={card.title}
                                    value={card.value}
                                    description={card.description}
                                    icon={card.icon}
                                />
                            ))
                        }
                        </div>
                    </div>
                    <div className={styles["page-weather__details-info-col"]}>
                        {
                            secondColumnCards.map((card, index) => (
                                <InformationCard
                                    isLoading={isLoading}
                                    key={index}
                                    title={card.title}
                                    value={card.value}
                                    description={card.description}
                                    icon={card.icon}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
             <div className={`${styles[`page-weather__hero--${WeatherEnum.getEnumForBackgroundImage(weatherData.weather ? weatherData.weather[0]?.icon : '50d')}`]} ${styles['page-weather__hero']} ${styles['page-weather--desktop']}`}>
                <Hero isLoading={isLoading} data={weatherData} />
            </div>
        </div>
    );
}