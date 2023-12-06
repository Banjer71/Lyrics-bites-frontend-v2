import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, test } from "vitest";
import SignUp from "./signup";

describe('signup componet rendered correclty', () => {
    test('signup placeholder is in the document', () => {
        render(<BrowserRouter><SignUp /></BrowserRouter>);

        const headingElement = screen.getByRole('heading')
        expect(headingElement).toBeInTheDocument()

        const paragraphElem = screen.getByText('Already have an account?')
        expect(paragraphElem).toBeInTheDocument()

        const placeholder = screen.getByPlaceholderText('Nickname')
        expect(placeholder).toBeInTheDocument()
    })

    test('if the image on the signup card is rendered', () => {
        render(<BrowserRouter><SignUp /></BrowserRouter>);
        const imageElement = screen.getByAltText('Record icon for signup/login form')
        expect(imageElement).toBeInTheDocument()
    })
})