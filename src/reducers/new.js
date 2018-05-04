
'use strict';

import * as actions from '.././actions/new.js';

const initState = {
    list:[]
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