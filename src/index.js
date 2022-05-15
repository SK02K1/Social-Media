import React from 'react';
import { App } from './App';
import { makeServer } from './server';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './app/store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Call make Server
makeServer();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
