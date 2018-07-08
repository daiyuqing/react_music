/**
	音乐播放组件
*/

import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import * as actions from '../.././actions/music.js';
class Player extends Component{
	constructor(){
		super();
		this.state={
			
		}
		this.hash='';
	}
	componentWillMount(){
		
	}
	componentDidMount(){
		this.props.actions.add_audio(this.refs.player);
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.hash!=this.hash&&nextProps.hash!=undefined) {
			fetch('/kugou/app/i/getSongInfo.php?cmd=playInfo&hash='+nextProps.hash).then( (res) => res.json()).then(
	            (result)=>{
	               this.props.actions.current_music(result);
	               fetch('/kugou/app/i/krc.php?cmd=100&hash='+nextProps.hash+'&timelength=222000').then( (res) => res.text()).then(
			            (res)=>{
			                this.props.actions.music_krc(res.split('\n'));
			                this.hash=nextProps.hash;
			            },(error)=>{
			                console.log(error);
			            }
			        );
	            },(error)=>{
	                console.log(error);
	            }
	        );
		}
	}
	onEnded(){
		let play_list=this.props.play_list;
		for(let i in play_list){
			if (this.props.hash==play_list[i].hash) {
				if (play_list.length==1) {
					this.props.audio.player.seekTo(0);
				}else if (i==play_list.length-1) {
					this.props.actions.music_get_hash(play_list[0].hash);
				}else{
					this.props.actions.music_get_hash(play_list[i+1].hash);
				}
			}
		}
	}
	onProgress(e){
		this.props.actions.music_playtime({currentTime:e.playedSeconds,percentage:e.played});
	}
	render(){
		return <div style={{display:'none'}}>
			<ReactPlayer 
				ref='player'
				url={this.props.currentMusic?this.props.currentMusic.url:null}
			 	height='1rem'
			 	controls
			 	playing={this.props.playing}
			 	volume={this.props.volumeObj}
			 	onProgress={this.onProgress.bind(this)}
			 	onEnded={this.onEnded.bind(this)}
			/>
		</div>
	}
}
export default Player;	