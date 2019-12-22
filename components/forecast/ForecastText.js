import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ForecastText(props) {
  if (!props.forecast) {
    return null;
  }

  return (
    <View>
      <Text style={styles.forcastText}>{props.forecast.temperature}°</Text>

      <Text style={styles.forcastText}>{props.forecast.summary}</Text>
      <Text
        style={styles.darkSkyLink}
        onPress={() => Linking.openURL('https://darksky.net/poweredby')}
      >
        Powered by Dark Sky
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  forcastText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center'
  },
  darkSkyLink: {
    color: '#f25f4c',
    textAlign: 'center'
  }
});
