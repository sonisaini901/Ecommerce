import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './Store/Store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <SnackbarProvider
        maxSnack={2}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
