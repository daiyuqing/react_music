import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import New from 'components/New/New.js';

export default connect(
    (state)=>{
    	return {
    		new_song:state.Music.new_song,
    		play_list:state.Music.play_list,
    	}
    },
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(New);