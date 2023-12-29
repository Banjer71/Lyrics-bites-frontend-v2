import React from 'react'
import { render, screen } from '../../test-utils'
import { expect, vi } from "vitest";

import Navbar from "./navBar"

test('if the login/logout button is present', () => {
    render(<Navbar />);
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toBeInTheDocument()
    const myListLink = screen.getByRole('link', { name: 'My List' })
    expect(myListLink).toBeInTheDocument()
    const signupLink = screen.getByRole('link', { name: 'Signup' })
    expect(signupLink).toBeInTheDocument()
    const loginElement = screen.getByText('Login', { selector: 'li' });
    expect(loginElement).toBeInTheDocument();
    const logoutElement = screen.queryByText('Logout', { selector: 'li' });
    expect(logoutElement).not.toBeInTheDocument();
})