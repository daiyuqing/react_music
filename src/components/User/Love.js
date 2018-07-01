
/**
   收藏列表
*/
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/music.js';
import {IsEmpty} from '../.././util/tools.js';

class Love extends Component{
    constructor(){
        super();
        this.state={
            collections:[]
        }
    }
    componentWillMount(){
        let collection=localStorage.getItem('collection');
        if (collection) {
            let newCollection=collection.split(',');
            this.setState({
                collections:newCollection
            });
        }
    }
    play(item){
        let data={
            hash:item.split('|')[0],
            filename:item.split('|')[1]
        }
        let play_list=this.props.play_list;
        play_list.push(data);
        this.props.actions.add_song(play_list);
        this.props.actions.music_get_hash(data.hash);
        this.props.actions.music_control(true);
        location.href='#/play/'+data.hash;
    }
    delete(i){
        let collections=this.state.collections;
        collections.splice(i,1);
        this.setState({
            collections:collections
        });
        localStorage.setItem('collection',collections.join(','));
    }
    render() {
        let content=null;
        if (IsEmpty(this.state.collections)) {
            content=<div style={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:'3rem'}}>
                <i className="iconfont icon-nodata" style={{fontSize:'3rem',color:'#999'}}></i>
                <p style={{fontSize:'0.4rem',color:'#999'}}>暂无音乐，快去添加吧！</p>
            </div>
        }else{
            content=(<div>
                {this.state.collections.map((item,index)=>{
                    return (<div key={index} style={{width:'9.4rem',marginLeft:'0.3rem',padding:'0.3rem 0',display:'flex',borderBottom:'0.02rem solid #ccc',alignItems:'center'}}>
                            <p onClick={this.play.bind(this,item)} style={{width:'8rem',fontSize:'0.4rem',lineHeight:'0.6rem',color:'#333'}}>{item.split('|')[1]}</p>
                            <i onClick={this.delete.bind(this,index)} className="iconfont icon-close" style={{fontSize:'0.3rem',color:'#999',marginLeft:'1rem'}}></i>
                        </div>)
                })}
            </div>)
        }
        return (
            <div style={{width:'10rem'}}>
                <div style={{width:'10rem',height:'1.3rem',display:'flex',alignItems:'center',background:'#e9203d',boxSizing:'border-box'}}>
                    <Link to='/user/center'><i className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff',marginLeft:'0.2rem'}}></i></Link>
                    <span style={{color:'#fff',fontSize:'0.4rem',marginLeft:'3.4rem'}}>收藏列表({this.state.collections.length})</span>
                </div>
                {content}
            </div>
        );
    }
}
const styles={
    
}

export default Love;