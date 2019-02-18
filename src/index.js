import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// Redux Feature
import rootReducer from './reducers';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

const store = createStore(
    rootReducer,
    compose(
     // applyMiddleware(middleware),
      offline(offlineConfig)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
    
serviceWorker.register();
