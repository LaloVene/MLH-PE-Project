import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter as Router } from "react-router-dom";

import Header from './Header.component';
import GlobalContext from '../utils/state/GlobalContext';

describe('<Header />', () => {

    test('Header is rendered', async () => {

        const mockstate = {
            state: { token: null },
            dispatch: jest.fn()
        }

        const { getByTestId, getByText} = await render(<Router><GlobalContext.Provider value={mockstate}><Header/></GlobalContext.Provider></Router>);
        const header = getByTestId("headerLogo")
        const loginStatus = getByText("Login")
        
        expect(header).toBeDefined();
        expect(loginStatus).toBeDefined();
    });
});