import React from 'react'
import { render } from '@testing-library/react'
import { AuthProvider } from "./components/context/AuthContext";
import ToastMessageProvider from "./components/context/toastMessage";
import { BrowserRouter } from 'react-router-dom'



const AllTheProviders = ({ children }) => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ToastMessageProvider>
                    {children}
                </ToastMessageProvider>
            </AuthProvider>
        </BrowserRouter>

    )
}

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }