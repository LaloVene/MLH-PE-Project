import React from 'react';
import { render,getByTestId } from '@testing-library/react';
import Profile from './Profile.page';
import GlobalContext from '../utils/state/GlobalContext';
import GlobalReducer, { initialState } from "../utils/state/GlobalReducer";
import { useState, useReducer, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';

const mockdata = {
    "userData": {
        "email": "michelle@gmail.com", 
        "github": "mshen63", 
        "languages": [
          {
            "id": 15, 
            "name": "C"
          }
        ], 
        "name": "Michelle", 
        "topics": [
          {
            "id": 1, 
            "name": "Data Science"
          }, 
          {
            "id": 2, 
            "name": "Web Development"
          }
        ], 
        "username": "mishell0"
      }
    }


  beforeEach(() => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockdata),
    })
  );
  });

describe('<Profile />', () => {
  test('languages rendered', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    
    const { getByTestId } = await render(<Router><GlobalContext.Provider value={mockstate}><Profile/></GlobalContext.Provider></Router>);
    const lang = getByTestId('languages');
    expect(lang).toBeDefined();
  });
  test('topics rendered', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    
    const { getByTestId } = await render(<Router><GlobalContext.Provider value={mockstate}><Profile/></GlobalContext.Provider></Router>);
    const top = getByTestId('topics');
    expect(top).toBeDefined();
  });
  test('projects show no projects', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    
    const { getByText } = await render(<Router><GlobalContext.Provider value={mockstate}><Profile/></GlobalContext.Provider></Router>);
    const proj = getByText('No Projects');
    expect(proj).toBeDefined();
  });
})