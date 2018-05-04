import Artist from './artist.js';
import Home from './home.js';
import New from './new.js';
import { combineReducers } from 'redux';


const rootReducer= combineReducers({
	Artist,
	Home,
	New
});


export default rootReducer;


