import React from 'react';
import { App } from './App';
import { makeServer } from './server';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Call make Server
makeServer();

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
