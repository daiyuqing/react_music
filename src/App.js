import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Routes from './routes/index.js';
import rootReducer from './reducers/index.js';
let store=createStore(rootReducer);
class App extends Component{
	render(){
		return(<Provider store={store}>
				<Routes/>
			</Provider>)
	}
}
export default App;