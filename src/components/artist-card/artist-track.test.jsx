import {render, screen} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { describe, expect} from "vitest";
import ArtistCard from './artist-card';

describe('ArtistCard', () => {
    const track = ['Boys Don\'t Cry', 'Wish']
    test.skip('if the ArtistCard is rendered', () => {
        render(<ArtistCard track={track}/>)
        const albumName = screen.getByRole('list')
        expect(albumName).toBeInTheDocument()
    })

   
})