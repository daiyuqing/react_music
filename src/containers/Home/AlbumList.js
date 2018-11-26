import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import AlbumList from 'components/Home/AlbumList.js';
export default connect(
    (state)=>{
    	plist:state.Music.plist
    },
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(AlbumList);