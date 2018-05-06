import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/home.js';
import Header from '../.././components/common/Header.js';
import Nav from '../.././components/common/Nav.js';
import Recommend from '../.././components/Home/Recommend.js';
// import Carousel from '../.././components/Home/Carousel.js';
class Home extends Component{
	render(){
		let list=this.props.list;
		return(<div>
				<Header/>
				<Nav page='home'/>
				<Recommend/>
			</div>)
	}
}


export default connect(
  	(state)=>state.Home,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Home);