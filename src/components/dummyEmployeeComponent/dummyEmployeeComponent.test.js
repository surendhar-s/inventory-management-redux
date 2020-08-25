import React from 'react';
import { shallow } from 'enzyme';
import DummyEmployeeComponent from './dummyEmployeeComponent';

describe('DummyEmployeeComponent', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<DummyEmployeeComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
