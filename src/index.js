import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from './App';


// Extend the default Chakra UI theme
const theme = extendTheme({
  config: {
    initialColorMode: "light", // Set the initial color mode to "light" or "dark"
    useSystemColorMode: false, // Set to true to enable automatic color mode based on user's system preference
  },
  fonts: {
    body: 'Poppins',
    heading: 'Inter',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "lightpink" : "white", // Set light pink shade as the background color in light mode
      },
    }),
  },
});

createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    
    <App />
  </ChakraProvider>
);
