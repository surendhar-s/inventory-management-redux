import React from 'react';
import { shallow } from 'enzyme';
import Header from './header';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Should render footer component', () => {
  it('Test whether footer component is rendered or not', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    getByText("Inventory Management")
  })
  it('Test whether footer component is rendered or not', () => {
  localStorage.setItem("userId", "1")
  const { getByText,getByTestId } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    fireEvent.click(getByTestId("logout-function"))
  })

});
