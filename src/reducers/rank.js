
'use strict';



const initState = {
    rankData:[],
    rankList:{}
};



export default (state=initState,action)=>{
	switch(action.type){
		case 'UPDATE_RANK':
			return Object.assign({},state,{
                rankData: action.data.rankData
              });
		case 'UPDATE_RANK_LIST':
			return Object.assign({},state,{
                rankData: action.data.rankList
              });
		default:
			return state;
	}
} 