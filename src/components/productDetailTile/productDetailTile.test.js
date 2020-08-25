import React from 'react';
import { shallow } from 'enzyme';
import ProductDetailTile from './productDetailTile';
import { Provider } from 'react-redux';
import configureMockStore from "redux-mock-store";
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore([])
describe('ProductDetailTile', () => {
  let store = mockStore({})
  let location = {
    state: {
      productData: {
        productName: "Mocked for testing",
        id: 1,
        productPrice: "1000",
        productCategory: "1",
        productStock: "1000",
        productDescription: "Mocked for desc",
        productAddedOn: "2020-08-09T04:54:46.245Z",
        productUpdatedOn: null,
        productCategoryName: "Mocked for category",
      }
    }
  }
  it('matches product name', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductDetailTile location={location} />
        </Provider>
      </BrowserRouter>
    )
    getByText("Name:")
    getByText("Mocked for testing")
  });
  it('should render the date in DD/MM/yyyy format', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductDetailTile location={location} />
        </Provider>
      </BrowserRouter>
    )
    getByText("Added on:")
    getByText("09/08/2020")
  });
  it('should render detail component for edit prodcut', () => {
    const { getByTestId, getAllByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductDetailTile location={location} />
        </Provider>
      </BrowserRouter>
    )
    fireEvent.click(getByTestId("edit-button"))
    getAllByText("Edit Product Details")
  });
});
