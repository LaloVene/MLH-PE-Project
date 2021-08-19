import React from 'react';
import { render,getByTestId, findByTestId, findByText,fireEvent } from '@testing-library/react';
import Login from './Login.page';
import GlobalContext from '../utils/state/GlobalContext';
import GlobalReducer, { initialState } from "../utils/state/GlobalReducer";
import { useState, useReducer, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';
// var React = require('react/addons');
// require('react-test-utils');
// var ReactTestUtils = React.addons.ReactTestUtils;



describe('<Login />', () => {
  test('login pic rendered', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    const { getByTestId } = await render(<Router><GlobalContext.Provider value={mockstate}><Login/></GlobalContext.Provider></Router>);
    const homecat = getByTestId('loginpic');
    expect(homecat).toBeDefined();
  });
  
  
  test('login button works', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    
    const { queryAllByText } = await render(<Router><GlobalContext.Provider value={mockstate}><Login/></GlobalContext.Provider></Router>);
    const button = await queryAllByText('Login')[0];
    fireEvent.click(button);  
    const invalid = await queryAllByText('Invalid');
    expect(invalid).toBeDefined();
  });
})



