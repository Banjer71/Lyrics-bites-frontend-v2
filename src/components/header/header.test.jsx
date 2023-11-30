import {render, screen} from '@testing-library/react'
import Header from './header'
import { expect } from 'vitest';


it('should render the title', () => {
    render(<Header />);
    const message = screen.queryByText(/Lyrics Bites/);
    expect(message).toBeVisible();
})