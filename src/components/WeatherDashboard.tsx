// I've used a class component here since it's preferable for lifecycle methods
// like componentDidMount which is ideal for fetching data on initial render.
// Functional components with useEffect can be used for simpler UI components within the app.

import { Component } from "react";
import { WeatherOverview } from "./WeatherOverview";
import { CityNav } from "./CityNav";
import { IWeatherData } from "../types/weatherTypes";
interface State {
  weatherData: IWeatherData;
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


const nextDaysSampleWeather = {
  // { main: { temp: 18 }, weather: [{ main: "Rain", description: "Rain" }] },
  // { main: { temp: 18 }, weather: [{ main: "Rain", description: "Rain" }] },
  // { main: { temp: 19 }, weather: [{ main: "Clouds", description: "Clouds" }] },
  // { main: { temp: 21 }, weather: [{ main: "Clouds", description: "Clouds" }] },
};

const CitySelections = [
  { name: "Toronto", lat: "45.4215", lon: "-75.6972" },
  { name: "Vancouver", lat: "49.2827", lon: "-123.1207" },
  { name: "Osaka", lat: "34.6937", lon: "135.5023" }
]
export class WeatherDashboard extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      units: "metric",
      weatherData: {},
      loading: true,
      citySelections: CitySelections,
      selectedCity: CitySelections[0].name
    };
  }

  componentDidMount(): void {
    this.state.citySelections.forEach(city => {
      //Fetch weather data for all cities once the component mounts
      this.fetchWeatherData(city, this.state.units)
        .then(data => {
          this.setState(prevState => ({
            weatherData: { ...prevState.weatherData, [city.name]: data },
            loading: Object.keys(prevState.weatherData).length === 0
          }));
        });
    });
  }

  fetchWeatherData = async (city: City, unit: string): Promise<any> => {
    const resonse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.WEATHER_API_KEY}&units=${unit}`
    );
    return await resonse.json();
  };

  handleCitySelection = (selectedCityName: string) => {
    this.setState({ selectedCity: selectedCityName });
    // Check if the data for the selected city is already in the state
    if (!this.state.weatherData[selectedCityName]) {
      // Data not available, fetch from API
      const city = this.state.citySelections.find(c => c.name === selectedCityName);
      if (city) {
        this.fetchWeatherData(city, this.state.units).then(weatherData => {
          this.setState(prevState => ({
            weatherData: { ...prevState.weatherData, [selectedCityName]: weatherData }
          }));
        });
      }
    }
  };

  render() {
    const { loading, weatherData, selectedCity } = this.state;
    console.log("🚀 ~ file: WeatherDashboard.tsx:86 ~ WeatherDashboard ~ render ~ weatherData:", weatherData)
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
            />  
          </>

        )}
      </div>
    );
  }
}

export { WeatherDashboard as default };
