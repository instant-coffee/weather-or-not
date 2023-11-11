import { WeatherIcon } from "./WeatherIcon";
import { roundTemperature } from "../utils/weatherUtilities";
import styles from "../styles/weatherChip.module.less";

interface IWeatherChip {
  weatherData: {date: string; avgTemp: number; avgHumidity: number; description: string; icon: string;}
  title: string;
  size: string;
}

const WeatherChip: React.FC<IWeatherChip> = ({ weatherData, title }) => {
  return (
    <div className={styles.chipContainer}>
      <h1 className={styles.title}>{title}</h1>
      <WeatherIcon weather={weatherData.icon} size="medium" />
      <h2 className={styles.chipNumber}>
        {roundTemperature(weatherData.avgTemp)}&deg;
      </h2>
    </div>
  );
};

export { WeatherChip };
