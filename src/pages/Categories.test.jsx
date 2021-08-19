import React from 'react';
import { render,getByTestId } from '@testing-library/react';
import Categories from './Categories.page';
import GlobalContext from '../utils/state/GlobalContext';
import GlobalReducer, { initialState } from "../utils/state/GlobalReducer";
import { useState, useReducer, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router';

// function mockFetch(data: any) {
//   return jest.spyOn(window, 'fetch').mockResolvedValue(new Response(JSON.stringify(data)));
// }

// beforeEach(() => mockFetch([]));


describe('<Categories />', () => {
  test('Categories are rendered', async () => {
    
    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    const { getByTestId } = await render(<Router><GlobalContext.Provider value={mockstate}><Categories/></GlobalContext.Provider></Router>);
    const cat = getByTestId('cat');
    expect(cat).toBeDefined();
  });
})