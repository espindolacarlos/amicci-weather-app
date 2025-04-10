
import DayClearSky from '../assets/day_clear_sky.jpg';
import NightClearSky from '../assets/night_clear_sky.jpg';
import DayScatteredClouds from '../assets/day_scattered_clouds.jpg';
import NightScatteredClouds from '../assets/night_scattered_clouds.jpg';
import Mist from '../assets/mist.jpg';
import Rain from '../assets/rain.jpg';
import Thunderstorm from '../assets/thunderstorm.jpg';
import { WEATHER_ENUM } from '../types/weather.enum';

/**
 * @description This file contains the background images for different weather conditions.
 */
export const backgroundImage = {
    [WEATHER_ENUM.DAY_CLEAR_SKY]: DayClearSky,
    [WEATHER_ENUM.NIGHT_CLEAR_SKY]: NightClearSky,
    [WEATHER_ENUM.DAY_SCATTERED_CLOUDS]: DayScatteredClouds,
    [WEATHER_ENUM.NIGHT_SCATTERED_CLOUDS]: NightScatteredClouds,
    [WEATHER_ENUM.MIST]: Mist,
    [WEATHER_ENUM.NIGHT_MIST]: Mist,
    [WEATHER_ENUM.RAIN]: Rain,
    [WEATHER_ENUM.NIGHT_RAIN]: Rain,
    [WEATHER_ENUM.THUNDERSTORM]: Thunderstorm,
    [WEATHER_ENUM.NIGHT_THUNDERSTORM]: Thunderstorm,
};
