import React from 'react';
import { render } from '@testing-library/react';

import SearchBar from './SearchBar.component';

describe('<SearchBar />', () => {

    test('Search Bar is rendered', async () => {
        const mockPlaceholder = "Test Placeholder Text"
        const { getByPlaceholderText } = await render(<SearchBar placeholder={mockPlaceholder}/>);
        const searchBar = getByPlaceholderText("Test Placeholder Text")
        expect(searchBar).toBeDefined();
    });
});
