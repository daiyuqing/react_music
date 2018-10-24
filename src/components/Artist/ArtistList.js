

/**
歌手列表组件
*/
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import {IsEmpty,getLocalTime} from 'util/tools.js';
import Loading from 'components/common/Loading.js';

class ArtistList extends Component{
    constructor(){
        super();
        this.state={
			artistList:{}
        }
    }
   	componentWillMount(){
        try{
            fetch('/kugou/singer/list/'+this.props.match.params.classid+'?json=true').then( (res) => res.json()).then(
                (result)=>{
                    console.log(result);
                    this.setState({
                    	artistList:result
                    });
                },(error)=>{
                    console.log(error);
                }
            );
        }catch(e){
            
        }
    }

    render() {
		if (IsEmpty(this.state.artistList)) {
			return <Loading/>
		}
		
        return (
            <div style={{width:'10rem'}}>
                <div style={{width:'10rem',height:'1.3rem',display:'flex',alignItems:'center',background:'#e9203d',boxSizing:'border-box'}}>
                    <Link to='/artist'>
                        <i className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff',marginLeft:'0.2rem'}}></i>
                    </Link>
                    <span style={{color:'#fff',fontSize:'0.4rem',marginLeft:'3.4rem'}}>{this.state.artistList.classname}</span>
                </div>
                {this.state.artistList.singers.list.info.map((item,index)=>{
                    let imgurl=item.imgurl.replace('{size}',400);
                    return <Link to={'/artist/list/singer/'+item.singerid} key={item.singerid}><div style={{height:'2rem',display:'flex',alignItems:'center',width:'9.6rem',margin:'0 0.2rem',borderBottom:'0.01rem solid #ccc'}}>
                        <img src={imgurl} style={{height:'1.4rem',width:'1.4rem'}} alt=""/>
                        <p style={{marginLeft:'0.4rem',fontSize:'0.4rem',width:'8rem',color:'#333'}}>{item.singername}</p>
                        <i className="iconfont icon-previewright" style={{fontSize:'0.6rem',color:'#666666'}}></i>
                    </div></Link>
                })}
            </div>
        );
    }
}
const styles={
    
}

export default connect(
    (state)=>state.Music,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(ArtistList);