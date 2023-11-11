// I've used a class component here since it's preferable for lifecycle methods
// like componentDidMount which is ideal for fetching data on initial render.
// Functional components with useEffect can be used for simpler UI components within the app.

import { Component } from "react";
import { WeatherOverview } from "./WeatherOverview";
import { CityNav } from "./CityNav";
import { IWeatherData, IForecastData } from "../types/weatherTypes";
import { CitySelections } from "../constants/citySelections";
interface State {
  weatherData: IWeatherData;
  forcastData: IForecastData;
  units: string;
  loading: boolean;
  citySelections: City[];
  selectedCity: string;
}

interface City {
  lat: string;
  lon: string;
  name: string;
}

export class WeatherDashboard extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      units: "metric",
      weatherData: {},
      forcastData: {},
      loading: true,
      citySelections: CitySelections,
      selectedCity: CitySelections[0].name
    };
  }

  componentDidMount(): void {
    const fetchTasks = this.state.citySelections.map(city => 
      this.fetchWeatherData(city, this.state.units)
    );
  
    Promise.all(fetchTasks).then(() => {
      this.setState({ loading: false });
    }).catch(error => {
      console.error('Error fetching weather data:', error);
      // Handle errors as needed
    });
  }

  fetchWeatherData = async (city: City, unit: string): Promise<void> => {
    const apiKey = process.env.WEATHER_API_KEY;
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=${unit}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=${unit}`;
  
    try {
      const currentWeatherResponse = await fetch(currentWeatherUrl);
      const currentWeatherData = await currentWeatherResponse.json();
  
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
  
      this.setState(prevState => ({
        ...prevState,
        weatherData: { ...prevState.weatherData, [city.name]: currentWeatherData },
        forcastData: { ...prevState.forcastData, [city.name]: forecastData.list }, // Assuming the forecast array is in `list`
      }));
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle errors as needed
    }
  }
  

  handleCitySelection = (selectedCityName: string) => {
    this.setState(prevState => {
      const newState = { ...prevState };
      newState.selectedCity = selectedCityName;
      // Check if the data for the selected city is already in the state
      if (!newState.weatherData[selectedCityName]) {
        // Data not available, fetch from API
        const city = newState.citySelections.find(c => c.name === selectedCityName);
        if (city) {
          this.fetchWeatherData(city, newState.units).then((weatherData: any) => {
            newState.weatherData[selectedCityName] = weatherData || {} as any;
            this.setState(newState);
          }).catch(error => {
            console.error('Error fetching weather data:', error);
            // Handle errors as needed
          });
        }
      }

      return newState;
    });
  };

  render() {
    const { loading, weatherData, forcastData, selectedCity } = this.state;
    const cities = Object.keys(weatherData);

    return (
      <div className="container flex flex-col">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <CityNav cities={cities} onCitySelect={this.handleCitySelection} selectedCity={selectedCity}/>
            <WeatherOverview
              todayWeather={weatherData[selectedCity]} 
              nextDaysWeather={forcastData[selectedCity]}
            />  
          </>

        )}
      </div>
    );
  }
}

export { WeatherDashboard as default };
