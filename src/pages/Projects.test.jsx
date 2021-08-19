import React from 'react';
import { render,getByTestId ,fireEvent} from '@testing-library/react';
import Projects from './Projects.page';
import GlobalContext from '../utils/state/GlobalContext';
import GlobalReducer, { initialState } from "../utils/state/GlobalReducer";
import { useState, useReducer, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';


const mockdata = {
    "projects": [
      {
        "date": "Sat, 14 Aug 2021 23:42:20 GMT", 
        "description": "world", 
        "id": 1, 
        "owner": "mishell0", 
        "title": "Hello ", 
        "url": "asd"
      }, 
      {
        "date": "Sun, 15 Aug 2021 23:43:33 GMT", 
        "description": "bob says hi", 
        "id": 2, 
        "owner": "bob1", 
        "title": "this is bob", 
        "url": "this is bob when the car goes by"
      }
    ]
}


  beforeEach(() => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockdata),
    })
  );
  });

describe('<Projects />', () => {
  test('projects are rendered', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    
    const { getByTestId } = await render(<Router><GlobalContext.Provider value={mockstate}><Projects/></GlobalContext.Provider></Router>);
    const proj = getByTestId('proj');
    expect(proj).toBeDefined();
  });
  test('click card opens modal', async () => {
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    
    const { getByTestId } = await render(<Router><GlobalContext.Provider value={mockstate}><Projects/></GlobalContext.Provider></Router>);
    const card = getByTestId('clickcard');
    fireEvent(
        card,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      )
    var modal = getByTestId('modal')
    expect(modal).toBeDefined();
  });
})