
'use strict';

import * as actions from '.././actions/home.js';

const initState = {
    banner:[],
    new_song:[],
    plist:[]
};



export default (state=initState,action)=>{
	switch(action.type){
		case 'UPDATE_NEW_SONG':
			return Object.assign({},state,{
                new_song: action.data.new_song
              });
			break;
		case 'UPDATE_BANNER':
			return Object.assign({},state,{
                banner: action.data.new_song
              });
			break;
		case 'UPDATE_PLIST':
			return Object.assign({},state,{
                plist: action.data.plist
              });
			break;
		default:
			return state;
	}
} 