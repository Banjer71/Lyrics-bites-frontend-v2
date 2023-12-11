/**
 * @vitest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from '@testing-library/user-event';
import SearchBar from './searchBar'
import ArtistCard from "../artist-card/artist-card";


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

        const buttonElement = screen.getByRole('button', { name: /get songs/i })
        expect(buttonElement).toBeInTheDocument()
    })


    test('if the button renders the results of what we typed in the input field', async () => {
        userEvent.setup()
        render(<SearchBar />)
        const getSongButton = screen.getByRole('textbox')
        await userEvent.type(getSongButton, 'prince')
        expect(getSongButton).toHaveValue('prince')
        const buttonElement = screen.getByRole('button', { name: /get songs/i })
        expect(buttonElement).toBeInTheDocument()
    })

    test('if clicking the button we have an array of 4 objects', async () => {
        userEvent.setup()
        render(<SearchBar />)
        const buttonElement = screen.getByRole('button', { name: /get songs/i })
        expect(buttonElement).toBeInTheDocument()
        userEvent.click(buttonElement)
        expect(screen.findByText(/loading.../i)).toBeInTheDocument()
    })


})