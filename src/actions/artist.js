

export function get_singer_class(){
	return (dispatch,getState)=>{
		fetch('/kugou/singer/class&json=true').then( (res) => res.json()).then(
            (result)=>{
                dispatch({
					type:'UPDATE_SINGER_CLASS',
					data:{
						singer_class:result.list
					}
				});
            },(error)=>{
                console.log(error);
            }
        );
		
	}
}