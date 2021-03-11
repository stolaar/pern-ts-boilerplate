import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./store/store";
import {Provider} from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import './typography/fonts/Cormorant-Bold.ttf'
import './typography/fonts/Lato-Bold.ttf'
import './typography/fonts/Lato-Regular.ttf'
import './typography/fonts/Avenir-Book.otf'
import './typography/fonts/Avenir-Medium.otf'

import IntlProvider from "./intl/IntlProvider";

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
        </IntlProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
