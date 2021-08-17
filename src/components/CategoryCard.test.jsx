import React from 'react';
import { render } from '@testing-library/react';

import CategoryCard from './CategoryCard.component';

describe('<CategoryCard />', () => {

    test('Category Card is rendered', async () => {

        const mockCategoryCard = {
            name: "Test Category Card Name"
        }

        const { getByText } = await render(<CategoryCard name={mockCategoryCard.name} />);
        const categoryCard = getByText("Test Category Card Name")
        expect(categoryCard).toBeDefined();
    });
});
