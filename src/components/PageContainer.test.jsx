import React from 'react';
import { render } from '@testing-library/react';
import {BrowserRouter as Router } from "react-router-dom";
import PageContainer from './PageContainer.component';
import GlobalContext from '../utils/state/GlobalContext';

describe('<PageContainer />', () => {
    test('Page Container is rendered', async () => {
        const mockstate = {
            state: { token: null },
            dispatch: jest.fn()
        }

        const { getByText } = await render(<Router><GlobalContext.Provider value={ mockstate }><PageContainer>Test Text</PageContainer></GlobalContext.Provider></Router>);

        const pageContainer = getByText('Test Text');

        expect(pageContainer).toBeDefined();
    });
});
