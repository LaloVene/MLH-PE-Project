import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ProjectCard from './ProjectCard.component';
import GlobalContext from '../utils/state/GlobalContext';

describe('<ProjectCard />', () => {

    const mockstate = {
        state: { token: null },
        dispatch: jest.fn()
    }

    const mockProjectCard = {
        title: "Project Test",
        description: "This is a test description",
        date: "",
        url: "https://github.com/LaloVene/MLH-PE-Project",
        owner: "Test Owner",
        id: 1,
        editFunc: "",
        languages: ["Python", "JavaScript"],
        topics: ["Machine Learning", "Production Engineering"],
        collabs: ["Test Collaborator"]
    }

    test('Project Card is rendered', async () => {

        const { getByText } = await render(<GlobalContext.Provider value={mockstate}><ProjectCard {...mockProjectCard}></ProjectCard></GlobalContext.Provider>);

        const cardTitle = getByText("Project Test")
        const cardDescription = getByText("This is a test description")
        const cardOwner = getByText("Test Owner")
        const cardLanguages = getByText("Python", "JavaScript")
        const cardTopics = getByText("Machine Learning" && "Production Engineering")
        const cardCollabs = getByText("Test Collaborator")

        expect(cardTitle).toBeDefined();
        expect(cardDescription).toBeDefined();
        expect(cardOwner).toBeDefined();
        expect(cardLanguages).toBeDefined();
        expect(cardTopics).toBeDefined();
        expect(cardCollabs).toBeDefined();
    });

    test('Project Card is clickable', async () => {

        const { getByTestId } = await render(<GlobalContext.Provider value={mockstate}><ProjectCard {...mockProjectCard}></ProjectCard></GlobalContext.Provider>);

        const card = getByTestId('projectCard');
        fireEvent(
            card,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
        var modal = getByTestId('viewCard')
        expect(modal).toBeDefined();
    })

});
