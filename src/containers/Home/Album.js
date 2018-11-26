import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import Album from 'components/Home/Album.js';
export default connect(
    (state)=>{
    	return {
    		album:state.Music.album,
    		play_list:state.Music.play_list,
    	}
    },
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Album);