/**
	音乐播放组件
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {IsEmpty,formatTime,formatLength} from '../.././util/tools.js';
import Loading from '../.././components/common/Loading.js';
import * as actions from '../.././actions/play.js';
class Play extends Component{
	constructor(){
		super();
		this.state={
			data:{},
			krc:[],			//歌词
			show:'pic',     //当前显示图片还是歌词
			percent:0,      //播放进度
			paused:true
		}
	}
	componentWillMount(){
		let hash=this.props.match.params.hash;
		fetch('/kugou/app/i/getSongInfo.php?cmd=playInfo&hash='+hash).then( (res) => res.json()).then(
            (result)=>{
               console.log(result);
               fetch('/kugou/app/i/krc.php?cmd=100&hash='+hash+'&timelength=222000').then( (res) => res.text()).then(
		            (res)=>{
		               console.log(res);
		               this.setState({
		                data:result,
		                krc:res.split('\n'),
		         		paused:false
		               })
		            },(error)=>{
		                console.log(error);
		            }
		        );
            },(error)=>{
                console.log(error);
            }
        );
	}
	componentDidMount(){
		let self=this;
		//设置定时器每1秒获取当前歌曲的播放进度
		setInterval(()=>{
			try{
				let audio=document.getElementsByTagName('audio')[0];
				let percent=audio.currentTime/audio.duration;
				self.setState({
					percent:percent
				});
			}catch(e){

			}
		},1000);
		//注册进度条点击事件
		setTimeout(()=>{
			try{
				let progress_bar=document.getElementsByClassName('progress_bar')[0];
				progress_bar.addEventListener('click',function(e){
					let percent=e.offsetX/window.screen.width*10/7;
					self.setState({percent:percent});
					let audio=document.getElementsByTagName('audio')[0];
					audio.currentTime= audio.duration*percent;
				});
			}catch(e){
				
			}
		},1000);
	}
	//设置播或暂停
	paused(paused){
		let audio=document.getElementsByTagName('audio')[0];
		if (paused) {
			this.setState({paused:false});
			audio.play();
		}else{
			this.setState({paused:true});
			audio.pause();
		}
	}
	//返回
	back(){
		window.history.back();
	}
	//改变中间显示的状态，歌词或歌手照片
	changeContent(type){
		this.setState({show:type});
	}
	
	render(){
		console.log(this.props)
		let height=window.screen.availHeight/window.screen.availWidth*10+'rem';
		if (IsEmpty(this.state.data)) {
			return <Loading/>;
		}
		let data=this.state.data;
		let content=null;
		let total_time=formatTime(data.timeLength);
		let played_time='00:00';
		if (data.timeLength) {
			played_time=formatTime(data.timeLength*this.state.percent);
		}
		let play_button=null;
		if (this.state.paused) {
			play_button=<i onClick={this.paused.bind(this,true)} className="iconfont icon-play" style={{fontSize:'0.8rem',color:'#fff'}}></i>
		}else{
			play_button=<i onClick={this.paused.bind(this,false)} className="iconfont icon-pause" style={{fontSize:'0.8rem',color:'#fff'}}></i>
		}
		if (this.state.show=='pic') {
			content=<div onClick={this.changeContent.bind(this,'krc')} style={{flex:1}}>
				<img  src={data.imgUrl.replace('{size}','400')} style={{width:'6rem',height:'6rem',borderRadius:'6rem',border:'0.2rem solid #fff',boxShadow:'0 0 0.4rem #000',margin:'2rem 0',}} alt=""/>
			</div>
			
		}else{
			let marginTop=0;
			for(let i in this.state.krc){
				let krc_time=this.state.krc[i].slice(1,9);
				if (data.timeLength*this.state.percent<formatLength(krc_time)) {
					marginTop=-0.8*(i-1)+'rem';
					break;
				}
			}
			content=<div onClick={this.changeContent.bind(this,'pic')} style={{height:'10rem',overflow:'hidden',flex:1}}>
				<div style={{height:'10rem',marginTop:marginTop}}>
					{this.state.krc.map((item,index)=>{
						let krc_time=item.slice(1,9);
						if (data.timeLength*this.state.percent>formatLength(krc_time)) {
							return <p key={index} style={{color:'#e9203d',lineHeight:'0.8rem',height:'0.8rem',fontSize:'0.35rem',textAlign:'center'}}>{item.split(']')[1]}</p>
						}else{
							return <p key={index} style={{color:'#fff',lineHeight:'0.8rem',height:'0.8rem',fontSize:'0.4rem',textAlign:'center'}}>{item.slice(10)}</p>
						}
					})}
				</div>
			</div>
		}
		return <div style={{backgroundColor:'#ccc',display:'flex',flexDirection:'column',alignItems:'center',height:height}}>
			<div style={{height:'1rem',width:'10rem',paddingTop:'0.3rem'}}>
				<i onClick={this.back.bind(this)} className="iconfont icon-left" style={{fontSize:'0.5rem',color:'#fff',marginLeft:'0.3rem'}}></i>
			</div>
			<h2 style={{height:'1rem',textAlign:'center',fontSize:'0.6rem',color:'#fff'}}>{data.songName}</h2>
			<p style={{height:'1rem',textAlign:'center',fontSize:'0.4rem',color:'#fff'}}>- {data.singerName} -</p>
			{content}
			<div style={{height:'1rem',width:'9.4rem',padding:'0.3rem',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
				<span style={{fontSize:'0.4rem',color:'#fff'}}>{played_time}</span>
				<div className='progress_bar' style={{width:'7rem',height:'0.1rem',backgroundColor:'#fff'}}>
					<p style={{width:this.state.percent*7+'rem',height:'0.1rem',backgroundColor:'#e9203d'}}></p>
				</div>
				<span style={{fontSize:'0.4rem',color:'#fff'}}>{total_time}</span>
			</div>
			<div style={{height:'1rem',width:'9.4rem',padding:'0.3rem',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
				<i className="iconfont icon-shunxubofang" style={{fontSize:'0.6rem',color:'#fff'}}></i>
				<i  className="iconfont icon-prev" style={{fontSize:'0.6rem',color:'#fff'}}></i>
				{play_button}
				<i className="iconfont icon-next" style={{fontSize:'0.6rem',color:'#fff'}}></i>
				<i className="iconfont icon-bofangliebiaoicon" style={{fontSize:'0.6rem',color:'#fff'}}></i>
			</div>
			<div style={{position:'fixed',right:'0rem',bottom:'0rem',height:'3rem',width:'3rem',backgroundColor:'red'}}>
				
			</div>
			<audio autoPlay>
			   <source src={data.url} type="audio/mpeg"/>
			   <source src={data.url} type="audio/ogg"/>
				您的浏览器不支持 audio 元素。
			</audio>
		</div>
	}
}
export default connect(
  	(state)=>state.Music,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Play);