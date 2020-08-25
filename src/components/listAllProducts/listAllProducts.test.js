import React from 'react';
import { shallow } from 'enzyme';
import ListAllProducts from './listAllProducts';
import configureMockStore from "redux-mock-store";
import { render, getByText } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore([])
describe('ListAllProducts', () => {
  let store
  beforeEach(() => {
    store = mockStore({
      productList: [{
        productCategory: "1",
        productName: "Name for testing",
        productStock: "1",
        productPrice: "1.00",
        productDescription: "Description for testing",
        productAddedOn: "2020-01-01T12:00:00.000Z",
        productUpdatedOn: "2020-01-01T12:00:00.001Z",
        productUserId: "1",
        id: "0",
        productCategoryName: "Category for testing"
      },
      {
        productCategory: "1",
        productName: "Name for testing1",
        productStock: "1",
        productPrice: "1.00",
        productDescription: "Description for testing",
        productAddedOn: "2020-01-01T12:00:00.000Z",
        productUpdatedOn: "2020-01-01T12:00:00.001Z",
        productUserId: "1",
        id: "1",
        productCategoryName: "Category for testing"
      }]
    })
  })
  it('Should render data with table component', () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ListAllProducts />
        </Provider>
      </BrowserRouter>
    )
    getAllByText("Name for testing")
  })
});
