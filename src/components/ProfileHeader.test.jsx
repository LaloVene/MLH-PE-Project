import React from 'react';
import { getByTestId, render } from '@testing-library/react';

import ProfileHeader from './ProfileHeader.component';

describe('<ProfileHeader />', () => {
    const mockUser = {
        name: "Test User",
        username: "Test Username",
        bio: "Test Bio"
    };

    test('Profile Header is rendered', async () => {

        const { getAllByText } = await render(<ProfileHeader {...mockUser} />);

        const name = getAllByText(mockUser.name);
        const username = getAllByText(mockUser.username);
        const bio = getAllByText(mockUser.bio);

        expect(name).toBeDefined();
        expect(username).toBeDefined();
        expect(bio).toBeDefined();
    });

    test('Profile Picture is rendered', async () => {

        const { getByTestId } = await render(<ProfileHeader {...mockUser} />)

        const profilePicture = getByTestId('profile-picture');
        expect(profilePicture).toBeDefined();
    })
});
