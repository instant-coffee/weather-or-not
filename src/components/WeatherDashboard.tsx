// I've used a class component here since it's preferable for lifecycle methods
// like componentDidMount which is ideal for fetching data on initial render. 
//Functional components with useEffect can be used for simpler UI components within the app.

import React, { Component } from 'react';

interface State {
    cities: string[];
    weatherData: any[];
    loading: boolean;
}

export class WeatherDashboard extends Component<Record<string, never>, State> {
    render() {
        return (
            <div className='flex'>
                <h1>SANITY</h1>
            </div>
        );
    }
}

export { WeatherDashboard as default}
