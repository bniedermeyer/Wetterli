import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Linking
} from 'react-native';

export default class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      forecast: undefined,
      location: undefined
    };
  }

  componentDidMount() {
    this.determineGeolocation();
  }

  determineGeolocation() {
    navigator.geolocation.getCurrentPosition(location =>
      this.setState({
        loading: false,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      })
    );
  }

  async getForecast() {
    if (this.state.location) {
      console.log('requesting forecast');
      const reqUrl = `https://shiny-rc2.begin.app/forecast?lat=${this.state.location.latitude}&lng=${this.state.location.longitude}`;
      try {
        let response = await fetch(reqUrl);
        let responseJson = await response.json();
        this.setState({ forecast: responseJson });
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#ff8906" />
        </View>
      );
    } else {
      if (!this.state.forecast) {
        this.getForecast();
      }

      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
        >
          <Text style={styles.forcastText}>
            {this.state.forecast ? this.state.forecast.temperature : ''}
          </Text>

          <Text style={styles.forcastText}>
            {this.state.forecast ? this.state.forecast.summary : ''}
          </Text>
          <Text
            style={styles.darkSkyLink}
            onPress={() => Linking.openURL('https://darksky.net/poweredby')}
          >
            Powered by Dark Sky
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  forcastText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center'
  },
  darkSkyLink: {
    color: '#f25f4c'
  }
});
