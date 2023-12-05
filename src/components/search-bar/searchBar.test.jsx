import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import SearchBar from './searchBar'

describe('SearchBar', () => {
    test('render correctly', () => {
        render(<SearchBar />);
        const nameElement = screen.getByTestId('searchBar')
        expect(nameElement).toBeInTheDocument()

        const song = screen.getByRole('combobox')
        expect(song).toBeInTheDocument()

        const inputField = screen.getByRole('textbox')
        expect(inputField).toBeInTheDocument()

        const submitButton = screen.getByRole('button')
        expect(submitButton).toBeInTheDocument()

        const selectElement = screen.getByDisplayValue('By Artist')
        expect(selectElement).toBeInTheDocument()

        const headingElementOne = screen.getByRole('heading', { name: 'Lyrics Bites' });
        expect(headingElementOne).toBeInTheDocument()

        const headingElementTwo = screen.getByRole('heading', { level: 3 });
        expect(headingElementTwo).toBeInTheDocument()

        const labelElem = screen.getByLabelText('Search a Song')
        expect(labelElem).toBeInTheDocument()
    })
})