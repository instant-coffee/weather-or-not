//This WeatherIcon component is a class component, mainly to demonstrate the use of class components as per the assignment's bonus points.
// The component uses a switch statement to determine which icon to render based on the input weather condition.
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudRain, faSnowflake, faCloud } from '@fortawesome/free-solid-svg-icons'

interface Props {
  weather: string
}

class WeatherIcon extends React.Component<Props> {
  render() {
    const { weather } = this.props

    // Determine which icon to display based on the weather parameter
    let icon
    switch (weather.toLowerCase()) {
      case 'clear':
        icon = faSun
        break
      case 'rain':
        icon = faCloudRain
        break
      case 'snow':
        icon = faSnowflake
        break
      case 'clouds':
        icon = faCloud
        break
      default:
        icon = faSun // Default to sun icon
        break
    }

    return <FontAwesomeIcon icon={icon} />
  }
}

export { WeatherIcon }
