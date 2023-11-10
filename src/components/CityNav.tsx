import styles from '../styles/cityNav.module.less';

interface INavProps {
  cities: string[];
  onCitySelect: (city: string) => void;
  selectedCity: string;
}
const CityNav: React.FC<INavProps> = ({cities, onCitySelect, selectedCity}) => {
  return (
    <div className={styles.navContainer}>
      {cities.map((city) => (
        <div 
          className={`${styles.navItem} ${city === selectedCity ? styles.selected : ''}`}
          key={city}
          onClick={() => onCitySelect(city)}
          >
          {city.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export { CityNav };