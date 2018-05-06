import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/artist.js';
import Header from '../.././components/common/Header.js';
import Nav from '../.././components/common/Nav.js';
class Artist extends Component{
	render(){
		let list=this.props.list;
		return(<div>
				<Header/>
				<Nav page='artist'/>
				<p>artist</p>
			</div>)
	}
}


export default connect(
  (state)=>state.Artist,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Artist);