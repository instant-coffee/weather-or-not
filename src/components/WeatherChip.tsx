import { WeatherIcon } from './WeatherIcon'
import { roundTemperature } from '../utils/weatherUtilities'

export interface IWeatherData {
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
      }>
    main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number; // Optional as it might not be present in all responses
    grnd_level?: number; // Optional as it might not be present in all responses
    }
}
interface IWeatherChip {
    weatherData: IWeatherData
    title: string
    size: string
}

const WeatherChip: React.FC<IWeatherChip> = ({ weatherData, title, size }) => {
    const ChipFull = () => (
        <div className='chip chip-full flex flex-col'>
            <h1 className=''>{title}</h1>
            <div className='container flex'>
                <div className='flex-1 width-50'>
                    <WeatherIcon weather={weatherData.weather[0].main} size="large"/>
                </div>
                <div className='flex-1 width-50'>
                    <h2 className='text-xl text-number'>{roundTemperature(weatherData.main.temp)}&deg;</h2>
                    <h3 className='text-lg'>{weatherData.weather[0].description}</h3>
                </div>
            </div>
            
        </div>
    )

    const ChipCompact = () => (
        <div className='chip chip-compact flex flex-col'>
            <h1 className=''>{title}</h1>
            <WeatherIcon weather={weatherData.weather[0].main} size="medium"/>
            <h2 className='text-xl text-number'>{roundTemperature(weatherData.main.temp)}&deg;</h2>
        </div>
    )
    
    return (
        <div className='chip-container flex flex-col justify-center items-center p-4'>
            {/* { size === 'full' ? <ChipFull/> : <ChipCompact/>}                   */}
             <ChipCompact/>                  
        </div>
    )
}

export { WeatherChip }