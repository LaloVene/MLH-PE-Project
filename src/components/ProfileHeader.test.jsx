import React from 'react';
import { render } from '@testing-library/react';

import ProfileHeader from './ProfileHeader.component';

describe('<ProfileHeader />', () => {

    test('Profile Header is rendered', async () => {

        const mockUser = {
            name: "Test User",
            username: "Test Username",
            bio: "Test Bio"
        };

        const { getAllByText } = await render(<ProfileHeader {...mockUser} />);

        const name = getAllByText(mockUser.name);
        const username = getAllByText(mockUser.username);
        const bio = getAllByText(mockUser.bio);

        expect(name).toBeDefined();
        expect(username).toBeDefined();
        expect(bio).toBeDefined();
    });
});
