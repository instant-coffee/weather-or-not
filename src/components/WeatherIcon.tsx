//This WeatherIcon component is a class component, mainly to demonstrate the use of class components as per the assignment's bonus points.
// The component uses a switch statement to determine which icon to render based on the input weather condition.
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudRain, faSnowflake, faCloud } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/weatherFull.module.less'


type IconSize = '1x' | '5x' | '9x' | '10x';
interface IIconProps {
  weather: string
  size: string
}

class WeatherIcon extends React.Component<IIconProps> {
  render() {
    const { weather, size } = this.props

    // Determine which icon to display based on the weather parameter
    let icon
    let classNameProps
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

   let iconSize
    switch (size) {
        case 'large':
            iconSize = '9x'
            classNameProps = styles.iconStrokeLarge
            break
        case 'medium':
            iconSize = '5x'
            classNameProps = styles.iconStrokeMedium    
            break;
        default:
            iconSize = '1x'
            break;
    }

    return <FontAwesomeIcon icon={icon} size={iconSize as IconSize} className={classNameProps} />
  }
}

export { WeatherIcon }
