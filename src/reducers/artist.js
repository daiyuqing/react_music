
'use strict';

import * as actions from '.././actions/artist.js';

const initState = {
    list:[1]
};



export default (state=initState,action)=>{
	switch(action.type){
		case 'ADD':
			return Object.assign({},state,{
                list: action.data.list
              });
		default:
			return state;
	}
} 