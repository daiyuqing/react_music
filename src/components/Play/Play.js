/**
	音乐播放组件
*/

import React, { Component } from 'react';
import {IsEmpty,formatTime,formatLength} from '../.././util/tools.js';
import Loading from '../.././components/common/Loading.js';

class Play extends Component{
	constructor(){
		super();
		this.state={
			data:{},
			krc:[],			//歌词
			show:'pic',     //当前显示图片还是歌词
			percent:0,      //播放进度
			paused:true,
			showList:false, //是否显示播放歌单
		}
	}
	componentWillMount(){
		if (IsEmpty(this.props.play_list)) {
			window.history.back();
			return;
		}
		let hash=this.props.match.params.hash;
		this.getSongInfo(hash);
	}
	componentDidMount(){
		let self=this;
		//设置定时器每1秒获取当前歌曲的播放进度
		this.timer=setInterval(()=>{
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
				let audio=document.getElementsByTagName('audio')[0];
				audio.loop = false;//取消单曲循环即可：
				audio.addEventListener('ended', function () {
					self.nextSong();
				}, false);

				let progress_bar=document.getElementsByClassName('progress_bar')[0];
				progress_bar.addEventListener('click',function(e){
					let percent=e.offsetX/document.body.clientWidth*10/7;
					self.setState({percent:percent});
					let audio=document.getElementsByTagName('audio')[0];
					audio.currentTime= audio.duration*percent;
				});
			}catch(e){
				
			}
		},1000);
	}
	getSongInfo(hash){
		fetch('/kugou/app/i/getSongInfo.php?cmd=playInfo&hash='+hash).then( (res) => res.json()).then(
            (result)=>{
               console.log(result);
               fetch('/kugou/app/i/krc.php?cmd=100&hash='+hash+'&timelength=222000').then( (res) => res.text()).then(
		            (res)=>{
		                this.setState({
		                	data:result,
		                	krc:res.split('\n'),
		         		 	paused:false
		                });
		                window.history.replaceState(null, "react-music", '#/play/'+result.hash);
		                let audio=document.getElementsByTagName('audio')[0];
						audio.load();
		            },(error)=>{
		                console.log(error);
		            }
		        );
            },(error)=>{
                console.log(error);
            }
        );
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
	/*渲染播放歌单*/
	render_list(){
		if (!this.state.showList) {return}
		return <div style={{position:'fixed',bottom:'0rem',height:'10rem',width:'10rem',backgroundColor:'#fff'}}>
			<div style={{height:'1.5rem',width:'9.4rem',display:'flex',borderBottom:'0.02rem solid #ccc',justifyContent:'space-between',alignItems:'center',padding:'0 0.3rem'}}>
				<i onClick={this.hideList.bind(this)} className="iconfont icon-close" style={{fontSize:'0.4rem',color:'#999'}}></i>
				<p style={{fontSize:'0.4rem',color:'#999'}}>播放列表（{this.props.play_list.length}）首</p>
				<p onClick={this.deleteAll.bind(this)} style={{fontSize:'0.4rem',color:'#e9203d'}}>清除</p>
			</div>
			<div style={{height:'7.5rem',overflow:'scroll',width:'10rem'}}>
				{this.props.play_list.map((item,index)=>{
					let color='#999';
					if (item.hash==this.state.data.hash) {
						color='#e9203d';
					}
					return (<div key={index} style={{width:'9.4rem',marginLeft:'0.3rem',padding:'0.3rem 0',display:'flex',borderBottom:'0.02rem solid #ccc',alignItems:'center'}}>
							<p onClick={this.checkSong.bind(this,item.hash)} style={{width:'8rem',fontSize:'0.4rem',lineHeight:'0.6rem',color:color}}>{item.filename}</p>
							<i onClick={this.delete.bind(this,index,item.hash)} className="iconfont icon-close" style={{fontSize:'0.3rem',color:'#999',marginLeft:'1rem'}}></i>
						</div>)
				})}
			</div>
		</div>
	}
	hideList(){
		this.setState({showList:false});
	}
	showList(){
		this.setState({showList:true});
	}
	/*切歌*/
	checkSong(hash){
		if (hash==this.state.data.hash) {
			return;
		}else{
			this.getSongInfo(hash);
		}
	}
	/*清空播放歌单*/
	deleteAll(){
		this.props.actions.add_song([]);
		window.history.back();
	}
	/*删除歌单某一首*/
	delete(i,hash){
		if (hash==this.props.match.params.hash) {
			if (this.props.play_list.length==1) {
				window.history.back();
			}else{
				let new_hash='';
				if (i==this.props.play_list.length-1) {
					new_hash=this.props.play_list[0].hash;
				}else{
					new_hash=this.props.play_list[i+1].hash;
				}
				this.getSongInfo(new_hash);
			}
		}
		this.props.play_list.splice(i,1);
		this.props.actions.add_song(this.props.play_list);
	}
	prevSong(){
		let hash=this.state.data.hash;
		let play_list=this.props.play_list;
		for(let i in play_list){
			if (play_list[i].hash==hash) {
				let new_hash='';
				if (play_list.length==1) {
					new_hash=hash;
				}else{
					if (i==0) {
						new_hash=play_list[play_list.length-1].hash;
					}else{
						let index=parseInt(i)-1;
						new_hash=play_list[index].hash;
					}
				}
				this.getSongInfo(new_hash);
				let audio=document.getElementsByTagName('audio')[0];
				audio.load();
			}
		}
	}
	nextSong(){
		let hash=this.state.data.hash;
		let play_list=this.props.play_list;
		for(let i in play_list){
			if (play_list[i].hash==hash) {
				let new_hash='';
				if (play_list.length==1) {
					new_hash=hash;
				}else{
					if (i==play_list.length-1) {
						new_hash=play_list[0].hash;
					}else{
						let index=parseInt(i)+1;
						new_hash=play_list[index].hash;
					}
				}
				this.getSongInfo(new_hash);

			}
		}
	}
	touchstart(){
		clearInterval(this.timer);
	}
	touchend(){
		let audio=document.getElementsByTagName('audio')[0];
		audio.currentTime= audio.duration*this.state.percent;
		audio.load();
		this.timer=setInterval(()=>{
			try{
				let audio=document.getElementsByTagName('audio')[0];
				let percent=audio.currentTime/audio.duration;
				self.setState({
					percent:percent
				});
			}catch(e){

			}
		},1000);
	}
	touchmove(e){
		let new_percent=e.touches[0].pageX/document.body.offsetWidth-0.13;
		if (new_percent<0) {
			new_percent=0;
		}
		if (new_percent>1) {
			new_percent=1
		}
		this.setState({percent:new_percent});
	}
	play_krc(text){
		return formatLength(text.slice(1,9))>this.state.data.timeLength*this.state.percent;
	}
	/*拿到当前音乐对应的歌词位置*/
	getPlayKrc(){
		return this.state.krc.findIndex(this.play_krc.bind(this));
	}
	render(){
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
			let current_index=this.getPlayKrc();
			content=<div onClick={this.changeContent.bind(this,'pic')} style={{height:'10rem',overflow:'hidden',flex:1}}>
				<div style={{height:'10rem',marginTop:5-0.8*current_index+'rem'}}>
					{this.state.krc.map((item,index)=>{
						let color='#fff';
						if (index==current_index-1) {
							color='#e9203d';
						}
						return <p key={index} style={{color:color,lineHeight:'0.8rem',height:'0.8rem',fontSize:'0.4rem',textAlign:'center'}}>{item.slice(10)}</p>
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
			<div style={{height:'1rem',width:'9.4rem',padding:'0.3rem',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',position:'relative'}}>
				<span style={{fontSize:'0.4rem',color:'#fff'}}>{played_time}</span>
				<div className='progress_bar' style={{width:'7rem',height:'0.1rem',backgroundColor:'#fff'}}>
					<p style={{width:this.state.percent*7+'rem',height:'0.1rem',backgroundColor:'#e9203d'}}></p>
				</div>
				<div onTouchStart={this.touchstart.bind(this)} onTouchEnd={this.touchend.bind(this)} onTouchMove={this.touchmove.bind(this)} style={{height:'0.4rem',width:'0.4rem',borderRadius:'0.4rem',backgroundColor:'#e9203d',position:'absolute',left:1.3+this.state.percent*7+'rem'}}></div>
				<span style={{fontSize:'0.4rem',color:'#fff'}}>{total_time}</span>
			</div>
			<div style={{height:'1rem',width:'9.4rem',padding:'0.3rem',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
				<i className="iconfont icon-shunxubofang" style={{fontSize:'0.6rem',color:'#fff'}}></i>
				<i onClick={this.prevSong.bind(this)} className="iconfont icon-prev" style={{fontSize:'0.6rem',color:'#fff'}}></i>
				{play_button}
				<i onClick={this.nextSong.bind(this)} className="iconfont icon-next" style={{fontSize:'0.6rem',color:'#fff'}}></i>
				<i onClick={this.showList.bind(this)} className="iconfont icon-bofangliebiaoicon" style={{fontSize:'0.6rem',color:'#fff'}}></i>
			</div>
			{this.render_list()}
			<audio autoPlay>
			   <source src={data.url} type="audio/mpeg"/>
			   <source src={data.url} type="audio/ogg"/>
				您的浏览器不支持 audio 元素。
			</audio>
		</div>
	}
}
export default Play;