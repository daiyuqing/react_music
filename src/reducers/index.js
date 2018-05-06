import Artist from './artist.js';
import Home from './home.js';
import New from './new.js';
import Rank from './rank.js';
import { combineReducers } from 'redux';


const rootReducer= combineReducers({
	Artist,
	Home,
	New,
	Rank
});


export default rootReducer;


