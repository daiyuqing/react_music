function get_banner(){
	return (dispatch, getState) => {
		fetch('/kugou/?json=true').then( (res) => res.json()).then(
	        (result)=>{
	            let collection=localStorage.getItem('collection');
	            let new_song=result.data;
	            if (collection) {
	                for(let i in new_song){
	                    if (collection.indexOf(new_song[i].audio_id)>-1) {
	                        new_song[i].collected=true;
	                    }
	                }
	            }
	            dispatch(update_new_song(new_song));
	            dispatch(update_banner(result.banner));
	        },(error)=>{
	            console.log(error);
	        }
	    );
    }
}

function get_plist(){
	return (dispatch, getState) => {
		fetch('/kugou/plist/index?json=true').then( (res) => res.json()).then(
	        (result)=>{
	            dispatch(update_plist(result.plist.list.info));
	        },(error)=>{
	            console.log(error);
	        }
	    );
    }
}
function get_plist_by_id(id){
	return (dispatch, getState) => {
		fetch('/kugou/plist/list/'+id+'?json=true').then( (res) => res.json()).then(
            (result)=>{
               dispatch(update_album(result));
            },(error)=>{
                console.log(error);
            }
        );
    }
}



function update_new_song(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'UPDATE_NEW_SONG',
			data:{
				new_song:rsp
			}
		});
	}
}

function update_banner(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'UPDATE_BANNER',
			data:{
				banner:rsp
			}
		});
	}
}

function update_plist(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'UPDATE_PLIST',
			data:{
				plist:rsp
			}
		});
	}
}

function update_album(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'UPDATE_ALBUM',
			data:{
				album:rsp
			}
		});
	}
}


function add_song(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'ADD_SONG',
			data:{
				play_list:rsp
			}
		});
	}
}

function music_playtime(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'MUSIC_PLAYTIME',
			data:{
				progress:rsp
			}
		});
	}
}

function music_get_hash(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'MUSIC_GET_HASH',
			data:{
				hash:rsp
			}
		});
	}
}

function music_control(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'MUSIC_CONTROL',
			data:{
				playing:rsp
			}
		});
	}
}

function current_music(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'CURRENT_MUSIC',
			data:{
				currentMusic:rsp
			}
		});
	}
}

function music_krc(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'MUSIC_KRC',
			data:{
				krc:rsp
			}
		});
	}
}

function add_audio(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'MUSIC_OBJ',
			data:{
				audio:rsp
			}
		});
	}
}
function update_tabIndex(name){
	return (dispatch,getState)=>{
		dispatch({
			type:'UPDATE_TABINDEX',
			data:{
				tabIndex:name
			}
		});
	}
}
export {get_banner,get_plist,get_plist_by_id,update_new_song,update_banner,update_plist,update_album,add_song,music_playtime,music_get_hash,music_control,current_music,music_krc,add_audio,update_tabIndex};


