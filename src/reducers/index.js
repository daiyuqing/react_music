import Artist from './artist.js';
import New from './new.js';
import Rank from './rank.js';
import Music from './music.js';
import { combineReducers } from 'redux';


const rootReducer= combineReducers({
	Artist,
	New,
	Rank,
	Music
});


export default rootReducer;


