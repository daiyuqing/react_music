import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/home.js';
import Header from '../.././components/common/Header.js';
import Nav from '../.././components/common/Nav.js';
import Recommend from '../.././components/Home/Recommend.js';
// import Carousel from '../.././components/Home/Carousel.js';
class Home extends Component{
	constructor(){
        super();
    }
    componentWillMount(){
        try{
            fetch('/kugou/?json=true').then( (res) => res.json()).then(
                (result)=>{
					this.props.actions.update_new_song(result.data);
					this.props.actions.update_banner(result.data);
                },(error)=>{
                    console.log(error);
                }
            );
            fetch('/kugou/plist/index&json=true').then( (res) => res.json()).then(
                (result)=>{
                    this.props.actions.update_plist(result.plist.list.info);
                },(error)=>{
                    console.log(error);
                }
            );
        }catch(e){
            
        }
    }
	render(){
		console.log(this.props);
		return(<div>
				<Header/>
				<Nav page='home'/>
				<Recommend plist={this.props.plist} banner={this.props.banner} new_song={this.props.new_song}/>
			</div>)
	}
}

export default connect(
  	(state)=>state.Home,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Home);