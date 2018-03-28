import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import reducer from './reducers'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(reducer);
//console.log(store.getState());
ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider></BrowserRouter>
    , document.getElementById('root')
);
registerServiceWorker();
