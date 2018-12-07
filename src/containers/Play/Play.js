/**
	音乐播放页面
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import Play from 'components/Play/Play.js';
export default connect(
  	(state)=>{
  		return {
  			play_list:state.Music.play_list,
  			krc:state.Music.krc,
  			audio:state.Music.audio,
  			currentMusic:state.Music.currentMusic,
  			progress:state.Music.progress,
        playing:state.Music.playing,
        hash:state.Music.hash
  		}
  	},
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Play);