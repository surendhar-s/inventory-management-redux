import { render } from '@testing-library/react';
import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import AddOrEditProduct from './addOrEditProduct';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const mockStore = configureMockStore()
const store = mockStore({})
describe('should render AddProduct component', () => {
  test('should render all button and text field', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <AddOrEditProduct />
      </Provider>
    )
    getByText("Add")  //Check add button is rendered or not
    getByText("Cancel")  //Check add button is rendered or not
    getByPlaceholderText("Name")  //Check whether product field is rendered or not
    getByPlaceholderText("Price per unit")  //Check whether Price field is rendered or not
    getByPlaceholderText("Description")  //Check description product field is rendered or not
  })
})