import React from 'react';
import { shallow } from 'enzyme';
import Login from './login';
import configureMockStore from "redux-mock-store";
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore([])
describe('Login', () => {
  let store
  beforeEach(() => {
    store = mockStore([])
  })
  it('Rendered component', () => {
    const { getByText, getAllByPlaceholderText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    )
    getByText("login here using your email and password")
    getAllByPlaceholderText("Email")

  });
});
