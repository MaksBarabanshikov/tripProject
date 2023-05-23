import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app/App'
import './index.css'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from "@/app/utils/i18n";

const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    },
}

const theme = extendTheme({ colors })


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </I18nextProvider>
  </React.StrictMode>,
)
