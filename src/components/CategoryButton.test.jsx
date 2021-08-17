import React from 'react';
import { render } from '@testing-library/react';

import CategoryButton from './CategoryButton.component';

describe('<CategoryButton />', () => {
    test('Category Button is rendered', async () => {
        const { getByText } = await render(<CategoryButton>Test Text</CategoryButton>);
        const categoryButton = getByText('Test Text');
        expect(categoryButton).toBeDefined();
    });
});
