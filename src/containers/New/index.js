import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/home.js';
import Header from '../.././components/common/Header.js';
import Nav from '../.././components/common/Nav.js';
import heart_1  from '../.././static/images/heart_1.png';
import heart_2  from '../.././static/images/heart_2.png';
import Loading from '../.././components/common/Loading.js';
class New extends Component{
	constructor(){
        super();
        this.state={
            new_song:[]
        }
    }
    componentWillMount(){
    	try{
            fetch('/kugou/?json=true').then( (res) => res.json()).then(
                (result)=>{
                    console.log(result);
                    let collection=localStorage.getItem('collection');
                    let new_song=result.data;
                    if (collection) {
                    	for(let i in new_song){
                    		if (collection.indexOf(new_song[i].audio_id)>-1) {
                    			new_song[i].collected=true;
                    		}
                    	}
                    }
                    this.setState({
                        new_song:result.data
                    });
                },(error)=>{
                    console.log(error);
                }
            );
        }catch(e){
            
        }
    }
    collect(id,i){
		let collection=localStorage.getItem('collection');
		if (collection) {
			let newCollection=collection.split(',');
			if (newCollection.indexOf(id)>-1) {
				let index=newCollection.indexOf(id);
				newCollection.splice(index,1);
			}else{
				newCollection.push(id);
			}
			localStorage.setItem('collection',newCollection.join(','));
		}else{
			localStorage.setItem('collection',id);
		}
		this.state.new_song[i].collected=!this.state.new_song[i].collected;
		this.setState({
			new_song:this.state.new_song
		});
    }
	render(){
        let content=null;
        if (this.state.new_song.length==0) {
            content=(<Loading/>) ;
        }else{
            content=(<div style={{width:'10rem',padding:'0.25rem'}}>
                    {this.state.new_song.map((item,index)=>{
                        let url=heart_1;
                        if (item.collected) {
                            url=heart_2;
                        }
                        return (<div  key={item.audio_id} style={{width:'9.5rem',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'0.01rem solid #cccccc',padding:'0.4rem 0'}}>
                            <p style={{color:'#666666',fontSize:'0.4rem',width:'8rem',lineHeight:'0.5rem'}}>{item.filename}</p>
                            <img src={url} onClick={this.collect.bind(this,item.audio_id,index)} style={{height:'0.4rem',width:'0.4rem'}}/>
                        </div>)
                    })}
                </div>);
        }
		return(<div>
				<Header/>
				<Nav page='new'/>
				{content}
			</div>)
	}
}


export default connect(
  (state)=>state.New,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(New);