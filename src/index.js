import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';


import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';


ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <CssBaseline />
         <Provider store={store}>
            <App />
         </Provider>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
);


