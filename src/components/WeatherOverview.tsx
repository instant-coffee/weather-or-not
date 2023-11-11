import React from 'react'
import { WeatherChip } from './WeatherChip'
import { WeatherFull } from './WeatherFull'
import { ICityWeather, ForecastData } from '../types/weatherTypes'
import styles from '../styles/weatherOverview.module.less'



type WeatherOverviewProps = {
  todayWeather: ICityWeather
  nextDaysWeather:  ForecastData[]
}

interface AverageWeather {
  date: string;
  avgTemp: number;
  avgHumidity: number;
  description: string;
  icon: string;
}

const WeatherOverview: React.FC<WeatherOverviewProps> = ({ todayWeather, nextDaysWeather }) => {
    const calculateAverageTemperature = (weatherData: ForecastData[]) => {
      const groupedByDay: Record<string, ForecastData[]> = {};

      // Group data by day
      weatherData.forEach(entry => {
          const date = entry.dt_txt.split(' ')[0]; // Extract the date part
          if (!groupedByDay[date]) {
              groupedByDay[date] = [];
          }
          groupedByDay[date].push(entry);
      });

      // Calculate averages for each day
      const averages: AverageWeather[] = Object.keys(groupedByDay).map(date => {
          const entries = groupedByDay[date];
          const avgTemp = entries.reduce((sum, cur) => sum + cur.main.temp, 0) / entries.length;
          const avgHumidity = entries.reduce((sum, cur) => sum + cur.main.humidity, 0) / entries.length;
          const description = entries[0].weather[0].description; // Assume all entries have the same description
          const icon = entries[0].weather[0].main; // Assume all entries have the same icon

          return { date, avgTemp, avgHumidity, description, icon};
      });

      return averages;
    }

    const daylyAverages = calculateAverageTemperature(nextDaysWeather);

    return (
        <div className={styles.mainContainer}>
          {/* Today's weather */}
          <div className={styles.topSection}>
            <WeatherFull weatherData={todayWeather} title="Today"/>
          </div>
    
          {/* Next 4 days weather */}
          <div className={styles.bottomSection}>
            {daylyAverages.map((weatherData, index) => {
              const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
              const date = new Date();
              date.setDate(date.getDate() + index + 1); // Get the day after today, and so on.
              const dayName = dayNames[date.getDay()];
              
              return (
                <WeatherChip key={index} weatherData={weatherData} title={dayName} size="compact" />
              );
            })}
          </div>
        </div>
      );
    }
    
    
export { WeatherOverview}
    