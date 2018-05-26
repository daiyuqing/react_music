
'use strict';

const initState = {
    banner:[],
    new_song:[],
    plist:[],
    album:{},
    play_list:[]
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
                banner: action.data.banner
              });
			break;
		case 'UPDATE_PLIST':
			return Object.assign({},state,{
                plist: action.data.plist
              });
			break;
		case 'UPDATE_ALBUM':
			return Object.assign({},state,{
                album: action.data.album
              });
			break;
		case 'ADD_SONG':
		console.log(action.data.play_list);
			return Object.assign({},state,{
                play_list: action.data.play_list
              });
			break;
		default:
			return state;
	}
} 