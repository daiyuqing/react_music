/**
	音乐播放页面
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import Player from 'components/Play/Player.js';
export default connect(
  	(state)=>{
    	return {
    		play_list:state.Music.play_list,
    		currentMusic:state.Music.currentMusic,
    		playing:state.Music.playing,
    		progress:state.Music.progress,
    		audio:state.Music.audio,
    		hash:state.Music.hash,
    	}
    },
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Player);