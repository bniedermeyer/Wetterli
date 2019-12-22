import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ForecastIcon(props) {
  if (!props.icon) {
    return null;
  }
  const images = {
    'clear-day': require('../../assets/images/weather/clear-day.png'),
    'clear-night': require('../../assets/images/weather/clear-night.png'),
    cloudy: require('../../assets/images/weather/cloudy.png'),
    fog: require('../../assets/images/weather/fog.png'),
    'partly-cloudy-day': require('../../assets/images/weather/partly-cloudy-day.png'),
    'partly-cloudy-night': require('../../assets/images/weather/partly-cloudy-night.png'),
    rain: require('../../assets/images/weather/rain.png'),
    sleet: require('../../assets/images/weather/sleet.png'),
    snow: require('../../assets/images/weather/snow.png'),
    thunderstorm: require('../../assets/images/weather/thunderstorm.png'),
    wind: require('../../assets/images/weather/wind.png')
  };

  return <Image source={images[props.icon]} style={styles.weatherImage} />;
}

const styles = StyleSheet.create({
  weatherImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  }
});
