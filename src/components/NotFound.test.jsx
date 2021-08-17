import React from 'react';
import { render } from '@testing-library/react';

import NotFound from './NotFound.component';

describe('<NotFound />', () => {

    test('Not Found component is rendered', async () => {

        const mockNotFound = {
            title: "Test Not Found Title",
            message: "Test Not Found Message"
        }

        const { getByText } = await render(<NotFound {...mockNotFound} />);
        const notFoundTitle = getByText("Test Not Found Title")
        const notFoundMessage = getByText("Test Not Found Message")
        expect(notFoundTitle).toBeDefined();
        expect(notFoundMessage).toBeDefined();
    });
});
