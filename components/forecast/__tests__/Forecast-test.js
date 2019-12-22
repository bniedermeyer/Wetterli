import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Forecast from '../Forecast';

describe('ForecastComponent', () => {
  beforeEach(() => {
    const mockGeolocation = {
      watchPosition: jest.fn(),
      getCurrentPosition: jest.fn(() => ({
        coords: { longitude: 0, latitude: 0 }
      }))
    };

    navigator.geolocation = mockGeolocation;
  });

  it(`renders correctly as loading`, () => {
    const tree = renderer.create(<Forecast />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when making requests for weather', () => {
    const mockResponse = {
      apparentTemperature: 38.14,
      cloudCover: 0.69,
      dewPoint: 37.12,
      humidity: 0.88,
      icon: 'partly-cloudy-day',
      nearestStormBearing: 178,
      nearestStormDistance: 5,
      ozone: 385.9,
      precipIntensity: 0,
      precipProbability: 0,
      pressure: 1009.6,
      summary: 'Mostly Cloudy',
      temperature: 40.47,
      time: 1577038353,
      uvIndex: 0,
      visibility: 10,
      windBearing: 352,
      windGust: 5.98,
      windSpeed: 3.61
    };
    const wrapper = shallow(<Forecast />);
    wrapper.setState({ loading: false, forecast: mockResponse });
    expect(wrapper).toMatchSnapshot();
  });
});
