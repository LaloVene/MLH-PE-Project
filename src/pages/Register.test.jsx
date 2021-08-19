import React from 'react';
import { render,getByTestId, findByTestId, findByText, fireEvent} from '@testing-library/react';
import Register from './Register.page';
import GlobalContext from '../utils/state/GlobalContext';
import GlobalReducer, { initialState } from "../utils/state/GlobalReducer";
import { useState, useReducer, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';



describe('<Register />', () => {
  test('register pic rendered', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    const { getByTestId } = await render(<Router><GlobalContext.Provider value={mockstate}><Register/></GlobalContext.Provider></Router>);
    const regpic = getByTestId('registerpic');
    expect(regpic).toBeDefined();
  });
  test('register button', async () => {
    const mockstate = {
        state:{token:null},
        dispatch:jest.fn()
      }
      
      const { queryAllByText } = await render(<Router><GlobalContext.Provider value={mockstate}><Register/></GlobalContext.Provider></Router>);
      const button = await queryAllByText('Register')[0];
      fireEvent.click(button);  
      const requ = await queryAllByText('required');
      expect(requ).toBeDefined();
    })
})
