import React from 'react';
import { render,getByTestId } from '@testing-library/react';
import ForgotPassword from './ForgotPassword.page';
import GlobalContext from '../utils/state/GlobalContext';
import {BrowserRouter as Router} from 'react-router-dom'

describe('<ForgotPassword />', () => {
  test('Title rendered', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    const { getByText } = await render(<Router><GlobalContext.Provider value={mockstate}><ForgotPassword /></GlobalContext.Provider></Router>);
    const pass = getByText('Forgot Password');
    expect(pass).toBeDefined();
  });
})