import React from 'react';
import renderer from 'react-test-renderer';

import ForecastIcon from '../ForecastIcon';

it(`renders correctly`, () => {
  const tree = renderer.create(<ForecastIcon icon={'clear-day'} />).toJSON();

  expect(tree).toMatchSnapshot();
});
