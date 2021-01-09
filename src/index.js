import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store'
import { fetchAllModules } from './redux/allModulesSlice'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#1d1d1d',
      other: '#2e2e2e'
    },
    primary: {
      main: '#f44336',
    },
  },
});

store.dispatch(fetchAllModules())
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <CssBaseline/>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
