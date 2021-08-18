import React from 'react';
import { render,getByTestId, getByText } from '@testing-library/react';
import Category from './Category.page';
import GlobalContext from '../utils/state/GlobalContext';
import { MemoryRouter } from 'react-router';
import GlobalReducer, { initialState } from "../utils/state/GlobalReducer";
import { useState, useReducer, useEffect } from 'react';



describe('<Category />', () => {
  test('Projects are rendered', async () => {
    // props.match.params.id;
    const props = {
      match:{
        params:{
          id:"Machine Learning"
        }
      }
    }

    const mockstate = {
      state:{token:null},
      dispatch:jest.fn()
    }
    // const [state, dispatch]= useReducer(GlobalReducer, initialState);
    const { getByText } = await render(<MemoryRouter initialEntries={["/category/Machine%20Learning"]}><GlobalContext.Provider value={mockstate}><Category {...props} /></GlobalContext.Provider></MemoryRouter>);
    // const { getByTestId } = await render(<Category />, {props})
    const proj = getByText('There are no projects under this category.');
    expect(proj).toBeDefined();
  });
})