
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import createStore from './store/index';
import Routes from './routes/index.js';
import rootReducer from './reducers/index.js';
import './static/css/main.scss';
let store=createStore(rootReducer);
const Root=()=>(
	<Provider store={store}>
		<Routes/>
	</Provider>
);
export default Root;