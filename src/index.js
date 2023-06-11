import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from './App';
import NavBar from './Navbar';

// Extend the default Chakra UI theme
const theme = extendTheme({
  config: {
    initialColorMode: "light", // Set the initial color mode to "light" or "dark"
    useSystemColorMode: false, // Set to true to enable automatic color mode based on user's system preference
  },
});

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <NavBar /> 
    <App />
  </ChakraProvider>
);
