// I've used a class component here since it's preferable for lifecycle methods
// like componentDidMount which is ideal for fetching data on initial render. 
// Functional components with useEffect can be used for simpler UI components within the app.

import React, { Component } from 'react';

interface State {
    cities: City[];
    weatherData: any[];
    units: string;
    loading: boolean;
}

interface City {
    name: string;
    lat: string;
    lon: string;
}

export class WeatherDashboard extends Component<Record<string, never>, State> {

    constructor(props: Record<string, never>) {
        super(props);
        this.state = {
            cities: [{name: 'Toronto', lat: "33.44", lon: "94.04"}],
            units: 'metric',
            weatherData: [],
            loading: true
        };
    }

    componentDidMount(): void {
        //Fetch weather data for all cities once the component mounts
        Promise.all(this.state.cities.map(city => this.fetchWeatherData(city, this.state.units))).then(data => {
            this.setState({ weatherData: data, loading: false })
        })
    }

    fetchWeatherData = async (city: City, unit: string): Promise<any> => {
        const resonse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.WEATHER_API_KEY}&units=${unit}`)
        console.log("🚀 ~ file: WeatherDashboard.tsx:35 ~ WeatherDashboard ~ fetchWeatherData= ~ resonse:", resonse)
        return await resonse.json()
    }

    render() {
        return (
            <div className='flex flex-col'>
                <h1>SANITY</h1>
            </div>
        );
    }
}

export { WeatherDashboard as default}
