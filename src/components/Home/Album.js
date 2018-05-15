
/**
   专辑歌单
*/
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/music.js';
import Loading from '../.././components/common/Loading.js';
class Album extends Component{
    constructor(){
        super();
        this.state={
            data:{}
        }
    }
    componentWillMount(){
        if (this.props.match.params.id) {
            let id=this.props.match.params.id;
            try{
                fetch('/kugou/plist/list/'+id+'?json=true').then( (res) => res.json()).then(
                    (result)=>{
                       console.log(result);
                       this.props.actions.update_album(result);
                    },(error)=>{
                        console.log(error);
                    }
                );
            }catch(e){
                
            }
        }else{
            location.href='./home';
            return;
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
    playAll(){
        let play_list=this.props.play_list.concat(this.props.album.list.list.info);
        this.props.actions.add_song(play_list);
        location.href='#/play/'+this.props.album.list.list.info[0].hash;
    }
    render() {
        console.log(this.props)
        if (!this.props.album.info) {
            return <Loading/>
        }
        let info=this.props.album.info.list;
        let list=this.props.album.list.list.info;
        let imgurl=info.imgurl.replace('/{size}','');
        return (
            <div style={{width:'10rem'}}>
                <div style={{width:'10rem',height:'1.3rem',display:'flex',alignItems:'center',background:'#e9203d',boxSizing:'border-box'}}>
                    <Link to='/'><i className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff',marginLeft:'0.2rem'}}></i></Link>
                    <span style={{color:'#fff',fontSize:'0.4rem',marginLeft:'3.4rem'}}>歌单</span>
                </div>
                <div style={{background:'#ccc',borderBottom:'0.04rem solid #e9203d'}}>
                    <div style={{width:'10rem',display:'flex',height:'4.2rem',alignItems:'center'}}>
                        <img src={imgurl} style={{width:'3.6rem',height:'3.6rem',marginLeft:'0.3rem'}} alt=""/>
                        <div style={{width:'5rem',marginLeft:'0.3rem'}}>
                            <p style={{lineHeight:'0.7rem',fontSize:'0.4rem',color:'#333'}}>名称：{info.specialname}</p>
                            <p style={{height:'0.7rem',lineHeight:'0.7rem',fontSize:'0.4rem',color:'#333'}}>创建人：{info.nickname}</p>
                            <p style={{height:'0.7rem',lineHeight:'0.7rem',fontSize:'0.4rem',color:'#333'}}>更新时间：{info.publishtime.slice(0,10)}</p>
                        </div>
                    </div>
                    <div style={{width:'9.4rem',display:'flex',height:'1rem',alignItems:'center',justifyContent:'space-between',padding:'0 0.3rem'}}>
                        <p style={{height:'0.7rem',lineHeight:'0.7rem',fontSize:'0.4rem',color:'#e9203d'}}>播放全部</p>
                        <i onClick={this.playAll.bind(this)} className="iconfont icon-playlistadd" style={{fontSize:'0.6rem',color:'#e9203d'}}></i>
                    </div>
                </div>
                <div style={{width:'10rem',padding:'0 0.2rem'}}>
                    {list.map((item,index)=>{
                        return <div key={index} style={{height:'1.5rem',width:'9.6rem',borderBottom:'0.02rem solid #ccc',position:'relative'}}>
                            <Link to={'/play/'+item.hash}>
                                <p style={{fontSize:'0.4rem',color:'#333',marginTop:'0.3rem'}}>{item.filename}</p>
                                <p style={{fontSize:'0.35rem',color:'#666',marginTop:'0.2rem'}}>{item.remark}</p>
                                <i className="iconfont icon-heart" style={{fontSize:'0.6rem',position:'absolute',right:'0rem',top:'0.4rem',color:'#ccc'}}></i>
                            </Link>
                            
                        </div>
                    })}
                </div>
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
)(Album);