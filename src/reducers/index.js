import Artist from './artist.js';

import Rank from './rank.js';
import Music from './music.js';
import { combineReducers } from 'redux';


const rootReducer= combineReducers({
	Artist,
	Rank,
	Music 
});


export default rootReducer;


