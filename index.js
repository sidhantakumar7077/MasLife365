/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {combineReducers, createStore,applyMiddleware,compose} from 'redux';
import { Provider } from 'react-redux';
import CDReducer from './src/redux/reducer/reducerContentDetails';
// import { composeEnhancers } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    CDReducer
})
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
store.subscribe(() => store.getState());


const RNRedux = () => (
    <Provider store = { store }>
      <App />
    </Provider>
  )
  AppRegistry.registerComponent(appName, () => RNRedux);


