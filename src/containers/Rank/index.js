import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/home.js';
import Header from '../.././components/common/Header.js';
import Nav from '../.././components/common/Nav.js';
class Rank extends Component{
	render(){
		let list=this.props.list;
		return(<div>
				<Header/>
				<Nav page='rank'/>
				<p>Rank</p>
			</div>)
	}
}


export default connect(
  (state)=>state.Rank,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Rank);