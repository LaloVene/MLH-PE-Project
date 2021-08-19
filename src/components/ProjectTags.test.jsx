import React from 'react';
import { render } from '@testing-library/react';

import ProjectTags from './ProjectTags.component';

describe('<ProjectTags />', () => {
    const mockTags = {
        title: "Test Tags",
        tagType: ["test1", "test2", "test3", "test4", "test5"],
        limit: true
    };

    test('Profile Header is rendered', async () => {

        const { getByText } = await render(<ProjectTags {...mockTags} />);

        const title = getByText(mockTags.title + ":");
        const tagType = getByText(mockTags.tagType[0], mockTags.tagType[1], mockTags.tagType[2]);
        const limit = getByText("+ 2 more")

        expect(title).toBeDefined();
        expect(tagType).toBeDefined();
        expect(limit).toBeDefined();
    });
});
