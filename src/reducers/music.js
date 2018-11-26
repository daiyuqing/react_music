
'use strict';

const initState = {
    banner:[],
    new_song:[],
    plist:[],
    album:{},
    play_list:[],
    playing:false,
    progress:{currentTime: 0, percentage: 0},
    audio:{},
    lyricsUpdate:{},
    volumeObj:0.5,
    hash:'',
    currentMusic:{},
    krc:'',
    tabIndex:'1'
};


//展示歌单和播放歌单
export default (state=initState,action)=>{
	switch(action.type){
        case 'UPDATE_TABINDEX':
            return Object.assign({},state, action.data);
            break;
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
			return Object.assign({},state,{
                play_list: action.data.play_list
              });
			break;
		// 当前播放的音乐hash
		case 'MUSIC_GET_HASH':
            return Object.assign({},state,{
                hash: action.data.hash
              });
            break;
        // 当前播放的音乐
		case 'CURRENT_MUSIC':
            return Object.assign({},state, action.data);
            break;
        // 当前播放的音乐对象
        case 'MUSIC_OBJ':
            return Object.assign({},state, action.data);
            break;
        // 播放控制
        case 'MUSIC_CONTROL':
            return Object.assign({}, state, action.data);
           	break;
        // 播放进度
        case 'MUSIC_PLAYTIME':
            return Object.assign({}, state, action.data);
            break;
        // 声音对象
        case 'MUSIC_AUDIO':
            return Object.assign({}, state, action.data);
	        break;
        // 音量
        case 'MUSIC_VOLUME':
            return Object.assign({}, state, action.data);
        	break;
        // 歌词
        case 'MUSIC_KRC':
            return Object.assign({}, state, action.data);
        	break;
		default:
			return state;
	}
} 
