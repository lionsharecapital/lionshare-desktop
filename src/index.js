import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Flex} from 'reflexbox';
import './index.css';
import Application from './Modules/Application';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import TestComponent from './Modules/TestComponent/TestComponent';

// reducers
import {pricesReducer, uiReducer} from './Modules/Application/reducers/ApplicationReducers';

const rootReducer = combineReducers(
    {
        prices: pricesReducer,
        ui: uiReducer
    }
); 

const reduxStore = createStore(rootReducer, applyMiddleware(thunk));

// for debugging purposes
window.reduxStore = reduxStore;

ReactDOM.render(
    <Provider store={reduxStore}>
        <Flex auto>
            <Application/>            
        </Flex>
    </Provider>
    ,document.getElementById('root'));
registerServiceWorker();
