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