
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class Search extends Component{
	constructor(){
		super();
		this.state={
			hot_search:[],
			search_history:[]
		}
	}
	componentWillMount(){
		let search_history = localStorage.getItem('search_history');
		if (search_history) {
			search_history = JSON.parse(search_history);
			this.setState({search_history:search_history});
		} 
        try{
            fetch('/mobilecdn/api/v3/search/hot').then( (res) => res.json()).then(
                (result)=>{
                    this.setState({
                    	hot_search:result.data.info
                    });
                },(error)=>{
                    console.log(error);
                }
            );
        }catch(e){
            
        }
    }
    delete(i){
		let search_history = localStorage.getItem('search_history');
		if (search_history) {
			search_history = JSON.parse(search_history);
			search_history.splice(i,1);
			localStorage.setItem('search_history',JSON.stringify(search_history));
			this.setState({search_history:search_history});
		} 
    }
    search(keyword){
    	if (keyword) {
    		this.state.search_history.push(keyword);
			localStorage.setItem('search_history',JSON.stringify(this.state.search_history));
			localStorage.setItem('search_history_index',this.state.search_history.length-1);
    	}else if (this.refs.input.value) {
			this.state.search_history.push(this.refs.input.value);
			localStorage.setItem('search_history',JSON.stringify(this.state.search_history));
			localStorage.setItem('search_history_index',this.state.search_history.length-1);
    	}
		this.props.history.push('/search/result');
    }
    clickHistory(i){
		localStorage.setItem('search_history_index',i);
		this.props.history.push('/search/result');
    }
    clearHistory(){
    	localStorage.setItem('search_history','');
    	this.setState({search_history:[]});
    }
	render(){
		return(
			<div>
				<div style={{display:'flex',height:'1.2rem',background:'#e9203d',width:'10rem',alignItems:'center'}}>
					<Link to='/'>
						<i className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff',marginLeft:'0.2rem'}}></i>
					</Link>
	                <div style={{width:'7rem',borderRadius:'0.8rem',height:'0.8rem',backgroundColor:'#fff',position:'relative',marginLeft:'0.6rem'}}>
	                	<i className="iconfont icon-search" style={{fontSize:'0.5rem',color:'#aaa',position:'absolute',left:'0.3rem',top:'0.15rem'}}></i>
		                <input ref='input' placeholder='请输入关键字' style={{width:'5rem',height:'0.8rem',lineHeight:'0.8rem',color:'#999',fontSize:'0.4rem',marginLeft:'1rem',border:'none'}}/>
	                </div>
	                <p onClick={this.search.bind(this,'')} style={{height:'1.2rem',lineHeight:'1.2rem',color:'#fff',fontSize:'0.4rem',marginLeft:'0.6rem'}}>搜索</p>
	            </div>
	            <div style={{width:'10rem',padding:'0 0.3rem'}}>
	            	<p style={{borderBottom:'0.01rem solid #ccc',height:'1.2rem',lineHeight:'1.2rem',fontSize:'0.4rem',color:'#666',width:'9.4rem'}}>热门搜索</p>
	            	{this.state.hot_search.map((item,index)=>{
	            		let color='#333';
	            		let border_color='#999';
	            		if (index==0) {
	            			color='#e9203d';
	            			border_color='#e9203d';
	            		}
	            		return <p onClick={this.search.bind(this,item.keyword)} key={index} style={{display:'inline-block',padding:'0.2rem 0.3rem',border:'0.01rem solid '+border_color,borderRadius:'1rem',margin:'0.3rem 1rem 0rem 0rem',color:color,fontSize:'0.4rem'}}>{item.keyword}</p>
	            	})}
	            	<div style={{borderBottom:'0.01rem solid #ccc',height:'1.2rem',lineHeight:'1.2rem',fontSize:'0.4rem',color:'#666',width:'9.4rem',display:'flex',justifyContent:'space-between'}}>
			            <p style={{height:'1.2rem',lineHeight:'1.2rem',fontSize:'0.4rem',color:'#666'}}>搜索历史</p>
	            		<p onClick={this.clearHistory.bind(this)} style={{height:'1.2rem',lineHeight:'1.2rem',fontSize:'0.4rem',color:'#e9203d'}}>清除历史</p>
	            	</div>
		            {this.state.search_history.map((item,index)=>{
	            		return <div key={index} style={{borderBottom:'0.01rem solid #ccc',height:'1.2rem',lineHeight:'1.2rem',fontSize:'0.4rem',color:'#666',width:'9.4rem',display:'flex',justifyContent:'space-between'}}>
				            <p onClick={this.clickHistory.bind(this,index)} style={{height:'1.2rem',lineHeight:'1.2rem',fontSize:'0.4rem',color:'#666',width:'8rem'}}>{item}</p>
		            		<i onClick={this.delete.bind(this,index,item)} className="iconfont icon-close" style={{fontSize:'0.3rem',color:'#999'}}></i>
		            	</div>
	            	})}
	            </div>
			</div>
			)
	}
}


export default Search;