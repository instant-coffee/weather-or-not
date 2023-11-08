// I've used a class component here since it's preferable for lifecycle methods
// like componentDidMount which is ideal for fetching data on initial render.
// Functional components with useEffect can be used for simpler UI components within the app.

import { Component } from "react";
import { WeatherOverview } from "./WeatherOverview";
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

const todaySampleWeather = {
  main: { temp: 19 },
  weather: [{ main: "Clouds", description: "Clouds" }],
};

const nextDaysSampleWeather = [
  { main: { temp: 18 }, weather: [{ main: "Rain", description: "Rain" }] },
  { main: { temp: 18 }, weather: [{ main: "Rain", description: "Rain" }] },
  { main: { temp: 19 }, weather: [{ main: "Clouds", description: "Clouds" }] },
  { main: { temp: 21 }, weather: [{ main: "Clouds", description: "Clouds" }] },
];

export class WeatherDashboard extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      cities: [{ name: "Toronto", lat: "43.6532", lon: "-79.3832" }],
      units: "metric",
      weatherData: [],
      loading: true,
    };
  }

  componentDidMount(): void {
    //Fetch weather data for all cities once the component mounts
    Promise.all(
      this.state.cities.map((city) =>
        this.fetchWeatherData(city, this.state.units)
      )
    ).then((data) => {
      this.setState({ weatherData: data, loading: false });
    });
  }

  fetchWeatherData = async (city: City, unit: string): Promise<any> => {
    const resonse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.WEATHER_API_KEY}&units=${unit}`
    );
    return await resonse.json();
    console.log(
      "🚀 ~ file: WeatherDashboard.tsx:54 ~ WeatherDashboard ~ fetchWeatherData= ~ resonse:",
      resonse
    );
  };

  render() {
    return (
      <div className="container flex flex-col">
        {this.state.loading ? (
          <h1>Loading...</h1>
        ) : (
          <WeatherOverview
            todayWeather={todaySampleWeather}
            nextDaysWeather={nextDaysSampleWeather}
          />
        )}
      </div>
    );
  }
}

export { WeatherDashboard as default };
