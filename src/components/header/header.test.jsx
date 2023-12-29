import {render, screen} from '@testing-library/react'
import { describe, expect } from 'vitest';
import Header from './header'

describe('testing if the header component is rendered', () => {
    test('should render the title', () => {
        render(<Header />);
        const message = screen.queryByText('Lyrics Bites');
        expect(message).toBeVisible();
    })
    
    test('render the subtitle of the component', () => {
        render(<Header />);
        const message = screen.getByText('Learn your favourite song one bite at a time');
        expect(message).toBeInTheDocument();
    })
})
