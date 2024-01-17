import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./global.css"
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { reducers } from "./redux/reducers"
import thunk from "redux-thunk"
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react'
import { createStore, applyMiddleware, compose} from "redux"
import {GoogleOAuthProvider} from "@react-oauth/google"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)))



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

  //   <App />

  // </React.StrictMode>
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <GoogleOAuthProvider
        clientId={`380752963763-3po748erpq1k7rmoogkhub3k8vdojobs.apps.googleusercontent.com`}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </GoogleOAuthProvider>
      {/* </BrowserRouter> */}
    </Provider>

  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
