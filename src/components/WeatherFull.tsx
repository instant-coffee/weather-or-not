import { WeatherIcon } from './WeatherIcon'
import { roundTemperature } from '../utils/weatherUtilities'
import styles from '../styles/WeatherFull.module.less'


const WeatherFull = ({ weatherData, title }) => {
    return (
        <div className={styles.chipFull}>
            <h1>{title}</h1>
            <div className='container flex justify-center my-10'>
                <div className="pr-8">
                    <WeatherIcon weather={weatherData.weather[0].main} size="large"/>
                </div>
                <div className='pl-1'>
                    <h2 className='text-number'>{roundTemperature(weatherData.main.temp)}&deg;</h2>
                    <h3 className='text-lg'>{weatherData.weather[0].description}</h3>
                </div>
            </div>
        </div>
    )
}

export { WeatherFull }