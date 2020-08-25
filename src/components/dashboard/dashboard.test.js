import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './dashboard';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore([])

describe('Should render Dashboard component', () => {
  // it('Should not render chart when there is no products in the store', () => {
  //   const mockStore = configureMockStore()
  //   const store = mockStore([])
  //   store.dispatch({
  //     type: "ADD_PRODUCT",
  //     payload: []
  //   })
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <Dashboard />
  //     </Provider>
  //   )
  //   getByText("Dashboard")
  //   getByText("No product in inventory found, please add!!")
  // })
  //payload: {
  // productList: [{
  //   productCategory: "1",
  //   productName: "Name for testing",
  //   productStock: "1",
  //   productPrice: "1.00",
  //   productDescription: "Description for testing",
  //   productAddedOn: "2020-01-01T12:00:00.000Z",
  //   productUpdatedOn: "2020-01-01T12:00:00.001Z",
  //   productUserId: "1",
  //   id: "0",
  //   productCategoryName: "Category for testing"
  // }]
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
        productName: "Name for testing",
        productStock: "1",
        productPrice: "1.00",
        productDescription: "Description for testing",
        productAddedOn: "2020-01-01T12:00:00.000Z",
        productUpdatedOn: "2020-01-01T12:00:00.001Z",
        productUserId: "1",
        id: "0",
        productCategoryName: "Category for testing"
      }]
    })
  })
  it('Should render component when productList length not equal to zero', () => {
    // const { getByText } = render(
    //   <Provider store={store}>
    //     <Dashboard />
    //   </Provider>
    // )
    // getByText("Name for testing")
  })
});
