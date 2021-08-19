// import React from 'react';
import { render,getByTestId, findByTestId, findByText } from '@testing-library/react';
import Login from './Login.page';
import GlobalContext from '../utils/state/GlobalContext';
import GlobalReducer, { initialState } from "../utils/state/GlobalReducer";
import { useState, useReducer, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';
var React = require('react/addons');
require('react-test-utils');
var ReactTestUtils = React.addons.ReactTestUtils;



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
  test('username field works', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    
    const { getByTestId } = await render(<Router><GlobalContext.Provider value={mockstate}><Login/></GlobalContext.Provider></Router>);
    const input = await getByTestId('username');
    fireEvent.ionChange(input, 'test username');
    var username=await findByText('test username');
    
    expect(username).toBeDefined();
  });
  test('password field works', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    
    const { findAllByTestId } = await render(<Router><GlobalContext.Provider value={mockstate}><Login/></GlobalContext.Provider></Router>);
    const input = await getByTestId('password');
    fireEvent.ionChange(input, 'test password');
    var password=await findByText('test password');
    
    expect(password).toBeDefined();
  });
  test('login button works', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    
    const { findByText } = await render(<Router><GlobalContext.Provider value={mockstate}><Login/></GlobalContext.Provider></Router>);
    const button = await findByText('Login');
    fireEvent.click(button);  
    const invalid = await findByText('Invalid');
    expect(invalid).toBeDefined();
  });
})



