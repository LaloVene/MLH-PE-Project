import React from 'react';
import { render,getByTestId, findByTestId, findByText,fireEvent } from '@testing-library/react';
import ResetPassword from './ResetPassword.page';
import GlobalContext from '../utils/state/GlobalContext';
import GlobalReducer, { initialState } from "../utils/state/GlobalReducer";
import { useState, useReducer, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';




describe('<ResetPassword />', () => {
  test('ResetPassword pic rendered', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    const { getByTestId } = await render(<Router><GlobalContext.Provider value={mockstate}><ResetPassword/></GlobalContext.Provider></Router>);
    const resetpic = getByTestId('resetpic');
    expect(resetpic).toBeDefined();
  });
  test('reset password button', async () => {
    const mockstate = {
        state:{token:null},
        dispatch:jest.fn()
      }
      
      const { queryAllByText } = await render(<Router><GlobalContext.Provider value={mockstate}><ResetPassword/></GlobalContext.Provider></Router>);
      const button = await queryAllByText('Reset Password')[2];
      console.log("here")
      console.log(button)
      fireEvent.click(button);  
      const requ = await queryAllByText('required');
      expect(requ).toBeDefined();
    })
  
})
