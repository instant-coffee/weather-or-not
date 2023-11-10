import { WeatherIcon } from "./WeatherIcon";
import { roundTemperature } from "../utils/weatherUtilities";
import styles from "../styles/weatherChip.module.less";

export interface IWeatherData {
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number; // Optional as it might not be present in all responses
    grnd_level?: number; // Optional as it might not be present in all responses
  };
}
interface IWeatherChip {
  weatherData: IWeatherData;
  title: string;
  size: string;
}

const WeatherChip: React.FC<IWeatherChip> = ({ weatherData, title }) => {
  return (
    <div className={styles.chipContainer}>
      <h1 className={styles.title}>{title}</h1>
      <WeatherIcon weather={weatherData.weather[0].main} size="medium" />
      <h2 className={styles.chipNumber}>
        {roundTemperature(weatherData.main.temp)}&deg;
      </h2>
    </div>
  );
};

export { WeatherChip };
