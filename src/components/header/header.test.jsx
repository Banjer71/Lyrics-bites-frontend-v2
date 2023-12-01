import {render, screen} from '@testing-library/react'
import Header from './header'
import { expect } from 'vitest';


it('should render the title', () => {
    render(<Header />);
    const message = screen.queryByText('Lyrics Bites');
    expect(message).toBeVisible();
})

it('render the subtitle of the component', () => {
    render(<Header />);
    const message = screen.getByText('Learn your favourite song one bite at a time');
    expect(message).toBeInTheDocument();
})