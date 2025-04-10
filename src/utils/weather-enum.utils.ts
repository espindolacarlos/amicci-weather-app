import { WEATHER_ENUM } from "../types/weather.enum";
        
export class WeatherEnum {

    /**
     * 
     * @param icon string
     * @description Get the weather enum based on the icon
     * @example WeatherEnum.getEnum('01d')
     * @returns WEATHER_ENUM
     * @example WEATHER_ENUM.DAY_CLEAR_SKY
     */
    public static getEnum(icon: string): WEATHER_ENUM {
        const mappedIcons = {
            '01d': WEATHER_ENUM.DAY_CLEAR_SKY,
            '01n': WEATHER_ENUM.NIGHT_CLEAR_SKY,
            '02d': WEATHER_ENUM.FEW_CLOUDS,
            '02n': WEATHER_ENUM.FEW_CLOUDS,
            '03d': WEATHER_ENUM.DAY_SCATTERED_CLOUDS,
            '03n': WEATHER_ENUM.NIGHT_SCATTERED_CLOUDS,
            '04d': WEATHER_ENUM.BROKEN_CLOUDS,
            '04n': WEATHER_ENUM.BROKEN_CLOUDS,
            '09d': WEATHER_ENUM.SHOWER_RAIN,
            '09n': WEATHER_ENUM.SHOWER_RAIN,
            '10d': WEATHER_ENUM.RAIN,
            '10n': WEATHER_ENUM.NIGHT_RAIN,
            '11d': WEATHER_ENUM.THUNDERSTORM,
            '11n': WEATHER_ENUM.NIGHT_THUNDERSTORM,
            '13d': WEATHER_ENUM.SNOW,
            '13n': WEATHER_ENUM.SNOW,
            '50d': WEATHER_ENUM.MIST,
            '50n': WEATHER_ENUM.NIGHT_MIST,
        }
        return mappedIcons[icon as keyof typeof mappedIcons] ?? mappedIcons['50d'];
    }

    /**
     * 
     * @param icon string
     * @returns WEATHER_ENUM
     * @description Get the weather enum for background image based on the icon
     * @example WeatherEnum.getEnumForBackgroundImage('01d')
     * @returns WEATHER_ENUM
     * @example WEATHER_ENUM.DAY_CLEAR_SKY
     */
    public static getEnumForBackgroundImage(icon: string): WEATHER_ENUM {
        const mappedIcons = {
            '01d': WEATHER_ENUM.DAY_CLEAR_SKY,
            '01n': WEATHER_ENUM.NIGHT_CLEAR_SKY,
            '02d': WEATHER_ENUM.DAY_SCATTERED_CLOUDS,
            '02n': WEATHER_ENUM.NIGHT_SCATTERED_CLOUDS,
            '03d': WEATHER_ENUM.DAY_SCATTERED_CLOUDS,
            '03n': WEATHER_ENUM.NIGHT_SCATTERED_CLOUDS,
            '04d': WEATHER_ENUM.MIST,
            '04n': WEATHER_ENUM.NIGHT_MIST,
            '09d': WEATHER_ENUM.RAIN,
            '09n': WEATHER_ENUM.NIGHT_RAIN,
            '10d': WEATHER_ENUM.RAIN,
            '10n': WEATHER_ENUM.NIGHT_RAIN,
            '11d': WEATHER_ENUM.THUNDERSTORM,
            '11n': WEATHER_ENUM.NIGHT_THUNDERSTORM,
            '13d': WEATHER_ENUM.MIST,
            '13n': WEATHER_ENUM.NIGHT_MIST,
            '50d': WEATHER_ENUM.MIST,
            '50n': WEATHER_ENUM.NIGHT_MIST,
        }
        return mappedIcons[icon as keyof typeof mappedIcons] ?? mappedIcons['50d'];
    }
}