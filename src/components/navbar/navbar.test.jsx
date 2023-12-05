import {render, screen} from '@testing-library/react'
import { expect} from "vitest";
import Navbar from "./navBar"


test.skip('render the subtitle of the component', () => {
    render(<Navbar />);
    // const text = screen.getByText('Home');
    // expect(text).toBeInTheDocument();
})