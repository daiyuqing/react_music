export function update_rank(rsp){
	return (dispatch,getState)=>{
		dispatch({
			type:'UPDATE_RANK',
			data:{
				rankData:rsp
			}
		});
	}
}