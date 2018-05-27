export function update_singer_class(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'UPDATE_SINGER_CLASS',
			data:{
				singer_class:rsp
			}
		});
	}
}