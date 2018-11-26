import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import Nav from 'components/common/Nav.js';
export default connect(
  	(state)=>{
  		return {
	  		playing:state.Music.playing,
	  		tabIndex:state.Music.tabIndex,
	  	}
  	},
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Nav);