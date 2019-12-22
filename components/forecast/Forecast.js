import React, { Component } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import ForecastText from './ForecastText';
import ForecastIcon from './ForecastIcon';

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

  /**
   * Gets the users current location and updates the state
   */
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

  /**
   * Using the users current location, make a request to the backend for the current weather report
   */
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
        this.getForecast(); // only get the forecast if it doesn't currently exist
      }

      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'flex-end'
          }}
        >
          <ForecastIcon
            icon={this.state.forecast ? this.state.forecast.icon : undefined}
          />
          <ForecastText forecast={this.state.forecast} />
        </View>
      );
    }
  }
}
