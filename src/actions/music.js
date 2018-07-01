export function update_new_song(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'UPDATE_NEW_SONG',
			data:{
				new_song:rsp
			}
		});
	}
}

export function update_banner(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'UPDATE_BANNER',
			data:{
				banner:rsp
			}
		});
	}
}

export function update_plist(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'UPDATE_PLIST',
			data:{
				plist:rsp
			}
		});
	}
}

export function update_album(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'UPDATE_ALBUM',
			data:{
				album:rsp
			}
		});
	}
}


export function add_song(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'ADD_SONG',
			data:{
				play_list:rsp
			}
		});
	}
}

export function music_playtime(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'MUSIC_PLAYTIME',
			data:{
				progress:rsp
			}
		});
	}
}

export function music_get_hash(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'MUSIC_GET_HASH',
			data:{
				hash:rsp
			}
		});
	}
}

export function music_control(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'MUSIC_CONTROL',
			data:{
				playing:rsp
			}
		});
	}
}

export function current_music(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'CURRENT_MUSIC',
			data:{
				currentMusic:rsp
			}
		});
	}
}

export function music_krc(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'MUSIC_KRC',
			data:{
				krc:rsp
			}
		});
	}
}

export function add_audio(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'MUSIC_OBJ',
			data:{
				audio:rsp
			}
		});
	}
}