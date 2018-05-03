import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createstore} from 'redux';
import Routes from './routes/index.js';
// let store=createstore();
class App extends Component{
	render(){
		return(<Provider>
				<Routes/>
			</Provider>)
	}
}
export default App;