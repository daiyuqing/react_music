
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class SearchResult extends Component{
	constructor(){
		super();
		this.state={
			collection:'',
			searchList:[],
			keyword:''
		}
	}
	componentWillMount(){
		let collection=localStorage.getItem('collection');
        if (collection) {
            this.setState({
                collection:collection
            });
        }
		let index = localStorage.getItem('search_history_index');
		let search_history = localStorage.getItem('search_history');
		if (search_history) {
			search_history = JSON.parse(search_history);
			let keyword=search_history[index];
	        try{
	            fetch('/mobilecdn/api/v3/search/song?format=json&keyword='+keyword+'&page=1&pagesize=20').then( (res) => res.json()).then(
	                (result)=>{
	                    this.setState({
	                    	searchList:result.data.info,
	                    	keyword:keyword
	                    });
	                },(error)=>{
	                    console.log(error);
	                }
	            );
	        }catch(e){
	            
	        }
		} 
    }
    //播放全部
    playAll(){
        let play_list=this.props.play_list.concat(this.state.searchList);
        let list=this.state.searchList;
        this.props.actions.add_song(play_list);
        let hash=list[0].hash;
        this.props.actions.music_get_hash(hash);
        this.props.actions.music_control(true);
        this.props.history.push('/play/'+hash);
    }
    //点击歌曲，加入歌单，跳到播放页面
    playSong(item){
        let play_list=this.props.play_list;
        play_list.push(item);
        this.props.actions.add_song(play_list);
        this.props.actions.music_get_hash(item.hash);
        this.props.actions.music_control(true);
        this.props.history.push('/play/'+item.hash);
    }
    collect(hash,filename,i){
        let collection=localStorage.getItem('collection');
        if (collection) {
            let newCollection=collection.split(',');
            if (collection.indexOf(hash)>-1) {
                let index=newCollection.indexOf(hash+'|'+filename);
                newCollection.splice(index,1);
            }else{
                newCollection.push(hash+'|'+filename);
            }
            localStorage.setItem('collection',newCollection.join(','));
            this.setState({
                collection:newCollection.join(',')
            });
        }else{
            localStorage.setItem('collection',hash+'|'+filename);
            this.setState({
                collection:hash+'|'+filename
            });
        }
    }
	render(){
		return(
			<div>
				<div style={{width:'10rem',height:'1.3rem',background:'#e9203d',position:'relative'}}>
                    <Link to='/search'>
                        <i className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff',position:'absolute',left:'0.2rem',top:'0.4rem'}}></i>
                    </Link>
                    <p style={{color:'#fff',fontSize:'0.4rem',textAlign:'center',height:'1.3rem',lineHeight:'1.3rem'}}>{this.state.keyword}</p>
                    <i onClick={this.playAll.bind(this)} className="iconfont icon-playlistadd" style={{fontSize:'0.7rem',color:'#fff',position:'absolute',right:'0.2rem',top:'0.3rem'}}></i>
                </div>
	            <div style={{width:'10rem',padding:'0 0.2rem'}}>
                    {this.state.searchList.map((item,index)=>{
                        let color='#999';
                        if (this.state.collection.indexOf(item.hash)>-1) {
                            color='#e9203d';
                        }
                        return <div key={index}  style={{height:'1.5rem',width:'9.6rem',borderBottom:'0.02rem solid #ccc',display:'flex',alignItems:'center'}}>
                                <p onClick={this.playSong.bind(this,item)} style={{width:'9rem',fontSize:'0.4rem',color:'#333'}}>{item.filename}</p> 
                                <i onClick={this.collect.bind(this,item.hash,item.filename,index)} className="iconfont icon-heart" style={{fontSize:'0.5rem',color:color,marginLeft:'0.3rem'}}></i>
                        </div>
                    })}
                </div>
			</div>
			)
	}
}


export default SearchResult;