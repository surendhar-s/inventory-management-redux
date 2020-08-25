import React from 'react';
import { shallow } from 'enzyme';
import Footer from './footer';
import { render } from '@testing-library/react';

describe('Should render footer component', () => {
  it('Test whether footer component is rendered or not', () => {
    const {getByText} = render(<Footer/>)
    getByText("© All rights reserved.")
  })
});
