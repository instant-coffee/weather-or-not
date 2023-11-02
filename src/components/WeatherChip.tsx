import { WeatherIcon } from './WeatherIcon'
import { roundTemperature } from '../utils/weatherUtilities'

const WeatherChip: React.FC = ({ weatherData, title }) => {
    console.log("🚀 ~ file: WeatherChip.tsx:2 ~ WeatherChip ~ weatherData:", weatherData)
    return (
        <div className='chip-container flex flex-col justify-center items-center rounded-sm p-4'>
            <h1 className='text-3xl font-bold '>{title}</h1>
            <div className="flex">
                <div className='flex-1 width-50'>
                    <WeatherIcon weather={weatherData.weather[0].main} />
                </div>
                <div className='flex-1 width-50'>
                    <h2 className='text-xl'>{roundTemperature(weatherData.main.temp)}</h2>
                    <h3 className='text-lg'>{weatherData.weather[0].description}</h3>
                </div>
                
            </div>
            
        </div>
    )
}

export { WeatherChip }