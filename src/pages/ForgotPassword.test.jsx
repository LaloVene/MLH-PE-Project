import React from 'react';
import { render,getByTestId } from '@testing-library/react';
import ForgotPassword from './ForgotPassword.page';
import GlobalContext from '../utils/state/GlobalContext';

describe('<ForgotPassword />', () => {
  test('Title rendered', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    const { getByText } = await render(<GlobalContext.Provider value={mockstate}><ForgotPassword /></GlobalContext.Provider>);
    const pass = getByText('Forgot Password');
    expect(pass).toBeDefined();
  });
})