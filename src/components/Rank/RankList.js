

/**
排行榜歌曲列表组件
*/
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import {IsEmpty,getLocalTime} from 'util/tools.js';
import Loading from 'components/common/Loading.js';
import { Layout } from 'element-react';
class RankList extends Component{
    constructor(){
        super();
        this.state={
			rankList:{},
			collection:''
        }
    }
   	componentWillMount(){
   		let collection=localStorage.getItem('collection');
        if (collection) {
            this.setState({
                collection:collection
            });
        }
        try{
            fetch('/kugou/rank/info/?rankid='+this.props.match.params.id+'&page=1&json=true').then( (res) => res.json()).then(
                (result)=>{
                    console.log(result);
                    this.setState({
                    	rankList:result
                    });
                },(error)=>{
                    console.log(error);
                }
            );
        }catch(e){
            
        }
    }
    //播放全部
    playAll(){
        let play_list=this.props.play_list.concat(this.state.rankList.songs.list);
        let list=this.state.rankList.songs.list;
        this.props.actions.add_song(play_list);
        let hash=this.props.album.list.list.info[0].hash;
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
    render() {
		if (IsEmpty(this.state.rankList)) {
			return <Loading/>
		}
		let imgurl=this.state.rankList.info.bannerurl.replace('{size}','400');
        return (
            <div style={{width:'10rem'}}>
                <Layout.Row type="flex"  align="middle"  style={{height:'1.2rem',background:'#e9203d'}}>
                    <Layout.Col span="2" offset="1">
                        <Link to='/'><i className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff'}}></i></Link>
                    </Layout.Col>
                    <Layout.Col span="18">
                        <p style={{color:'#fff',fontSize:'0.4rem',textAlign:'center'}}>{this.state.rankList.info.rankname}</p>
                    </Layout.Col>
                </Layout.Row>
                <img src={imgurl} style={{width:'10rem',height:'4rem'}} alt=""/>
                <p style={{color:'#fff',fontSize:'0.4rem',marginTop:'-1rem',marginLeft:'4rem',height:'1rem',lineHeight:'1rem'}}>更新时间：{getLocalTime(this.state.rankList.songs.timestamp)}  </p>
                <div style={{width:'9.4rem',display:'flex',height:'1.4rem',alignItems:'center',justifyContent:'space-between',padding:'0 0.3rem',borderBottom:'0.02rem solid #e9203d'}}>
                    <p style={{height:'0.7rem',lineHeight:'0.7rem',fontSize:'0.4rem',color:'#e9203d'}}>播放全部</p>
                    <i onClick={this.playAll.bind(this)} className="iconfont icon-playlistadd" style={{fontSize:'0.6rem',color:'#e9203d'}}></i>
                </div>
                <div style={{width:'10rem',padding:'0 0.2rem'}}>
                    {this.state.rankList.songs.list.map((item,index)=>{
                        let color='#999';
                        if (this.state.collection.indexOf(item.hash)>-1) {
                            color='#e9203d';
                        }
                        let index_text_color='#666';
                        let index_bg_color='#fff';
                        if (index==0) {
							index_text_color='#fff';
                        	index_bg_color='#e9203d';
                        }else if(index==1){
							index_text_color='#fff';
                        	index_bg_color='#f90';
                        }else if(index==2){
							index_text_color='#fff';
                        	index_bg_color='#f70';
                        }
                        return <div key={index}  style={{height:'1.5rem',width:'9.6rem',borderBottom:'0.02rem solid #ccc',display:'flex',alignItems:'center'}}>
								<p style={{width:'0.6rem',height:'0.6rem',lineHeight:'0.6rem',fontSize:'0.4rem',color:index_text_color,textAlign:'center',borderRadius:'0.6rem',backgroundColor:index_bg_color}}>{index+1}</p>
                                <p onClick={this.playSong.bind(this,item)} style={{width:'8rem',fontSize:'0.4rem',color:'#333',marginLeft:'0.3rem'}}>{item.filename}</p> 
                                <i onClick={this.collect.bind(this,item.hash,item.filename,index)} className="iconfont icon-heart" style={{fontSize:'0.5rem',color:color}}></i>
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
)(RankList);

