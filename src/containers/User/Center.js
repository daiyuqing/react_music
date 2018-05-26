import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/music.js';
import Center from '../../components/User/Center.js';
export default connect(
  	(state)=>state.Music,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Center);