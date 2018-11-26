import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import Home from 'components/Home/index.js';
export default connect(
  	(state)=>{
  		return {
	  		plist:state.Music.plist,
	  		banner:state.Music.banner,
	  		new_song:state.Music.new_song
	  	}
  	},
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Home);