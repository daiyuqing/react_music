import React, {Component} from 'react';
import * as actions from '../.././actions/artist.js';
import Header from '../.././components/common/Header.js';
import Nav from '../.././components/common/Nav.js';
import right_arrow  from '../.././static/images/right_arrow.png';
import Loading from '../.././components/common/Loading.js';
import {IsEmpty} from '../.././util/tools.js';
import {Link} from 'react-router-dom';
class Singer extends Component{
	constructor(){
        super();
        this.state={
           singerInfo:{},
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
            fetch('/kugou/singer/info/'+this.props.match.params.singerid+'&json=true/').then( (res) => res.json()).then(
                (result)=>{
                    console.log(result);
                    this.setState({
                    	singerInfo:result
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
        let play_list=this.props.play_list.concat(this.state.singerInfo.songs.list);
        let list=this.state.singerInfo.songs.list;
        this.props.actions.add_song(play_list);
        location.href='#/play/'+this.state.singerInfo.songs.list[0].hash;
    }
    //点击歌曲，加入歌单，跳到播放页面
    playSong(item){
        let play_list=this.props.play_list;
        play_list.push(item);
        this.props.actions.add_song(play_list);
        location.href='#/play/'+item.hash;
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
    back(){
        window.history.back();
    }
	render(){
        if (IsEmpty(this.state.singerInfo)) {
            return(<Loading/>) ;
        }else{
        	let imgurl=this.state.singerInfo.info.imgurl.replace('{size}',400);
            return <div style={{width:'10rem'}}>
                <div style={{width:'10rem',height:'1.3rem',display:'flex',alignItems:'center',background:'#e9203d',boxSizing:'border-box'}}>
                    <i onClick={this.back.bind(this)} className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff',marginLeft:'0.2rem'}}></i>
                    <span style={{color:'#fff',fontSize:'0.4rem',marginLeft:'3.4rem'}}>{this.state.singerInfo.info.singername}</span>
                </div>
               	<div style={{width:'10rem',height:'6rem',overflow:'hidden',position:'relative'}}>
               		<img src={imgurl} style={{width:'10rem',height:'10rem',marginTop:'-2rem'}} />
               		<i onClick={this.playAll.bind(this)} className="iconfont icon-play" style={{fontSize:'2rem',color:'#fff',position:'absolute',left:'4rem',top:'2rem'}}></i>
               	</div>
               	<div style={{width:'10rem',padding:'0 0.2rem'}}>
                    {this.state.singerInfo.songs.list.map((item,index)=>{
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
        }
		
	}
}
export default Singer;