import React from 'react'
import { WeatherChip } from './WeatherChip'
import { WeatherFull } from './WeatherFull'
import styles from '../styles/WeatherOverview.module.less'

type WeatherDataType = {
  main: { temp: number }
  weather: [{ main: string; description: string }]
}

type WeatherOverviewProps = {
  todayWeather: WeatherDataType
  nextDaysWeather: WeatherDataType[]
}

const WeatherOverview: React.FC<WeatherOverviewProps> = ({ todayWeather }) => {
    return (
        <div className={styles.mainContainer}>
          {/* Today's weather */}
          <div className={styles.topSection}>
            <WeatherFull weatherData={todayWeather} title="Today"/>
          </div>
    
          {/* Next 4 days weather */}
          {/* <div className={styles.bottomSection}>
            {nextDaysWeather.map((weatherData, index) => {
              const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
              const date = new Date();
              date.setDate(date.getDate() + index + 1); // Get the day after today, and so on.
              const dayName = dayNames[date.getDay()];
              
              return (
                <WeatherChip key={index} weatherData={weatherData} title={dayName} size="compact" />
              );
            })}
          </div> */}
        </div>
      );
    }
    
    
export { WeatherOverview}
    