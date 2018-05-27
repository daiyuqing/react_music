
'use strict';

import * as actions from '.././actions/artist.js';

const initState = {
    singerClass:[]
};



export default (state=initState,action)=>{
	switch(action.type){
		case 'UPDATE_SINGER_CLASS':
			return Object.assign({},state,{
                singerClass: action.data.singer_class
              });
		default:
			return state;
	}
} 