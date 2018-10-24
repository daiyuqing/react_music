import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import Home from 'components/Home/index.js';
export default connect(
  	(state)=>state.Music,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Home);