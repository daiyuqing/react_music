import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/music.js';
import Header from '../.././components/common/Header.js';
import Nav from '../.././components/common/Nav.js';
import Loading from '../.././components/common/Loading.js';
import {IsEmpty} from '../.././util/tools.js';
class New extends Component{
	constructor(){
        super();
        this.state={
            new_song:[]
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
		this.props.new_song[i].collected=!this.props.new_song[i].collected;
		this.props.actions.update_new_song(this.props.new_song);
    }
	render(){
        let content=null;
        if (IsEmpty(this.props.new_song)) {
            content=(<Loading/>) ;
        }else{
            content=(<div style={{width:'10rem',padding:'0.25rem'}}>
                    {this.props.new_song.map((item,index)=>{
                        let heart=<i onClick={this.collect.bind(this,item.audio_id,index)} className="iconfont icon-heart" style={{fontSize:'0.5rem',color:'#666666'}}></i>;
                        if (item.collected) {
                            heart=<i onClick={this.collect.bind(this,item.audio_id,index)} className="iconfont icon-heart" style={{fontSize:'0.5rem',color:'#666666'}}></i>;
                        }
                        return (<div  key={item.audio_id} style={{width:'9.5rem',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'0.01rem solid #cccccc',padding:'0.4rem 0'}}>
                            <p style={{color:'#666666',fontSize:'0.4rem',width:'8rem',lineHeight:'0.5rem'}}>{item.filename}</p>
                            {heart}
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


export default New;