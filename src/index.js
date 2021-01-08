import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store'
import { fetchAllModules } from './redux/allModulesSlice'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { orange } from '@material-ui/core/colors';
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#1d1d1d',
    }
  },
});

store.dispatch(fetchAllModules())
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
