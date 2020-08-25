import React from 'react';
import { shallow } from 'enzyme';
import Register from './register';
import configureMockStore from "redux-mock-store";
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore([])
describe('Register', () => {
  let store=mockStore({})
  it('should render compoenent', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Register />
        </Provider>
      </BrowserRouter>
    )
    getByText("Sign up here using mail ID")
  });
});
