import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/home.js';
class Home extends Component{
	render(){
		let list=this.props.list;
		return(<div>{list[0]}</div>)
	}
}


export default connect(
  (state)=>state.Home,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Home);