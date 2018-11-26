import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/music.js';
import Recommend from 'components/Home/Recommend.js';

class Home extends Component{
	constructor(){
        super();
    }
    componentWillMount(){
        this.props.actions.get_banner();
        this.props.actions.get_plist();
    }
	render(){
        return <Recommend plist={this.props.plist} banner={this.props.banner} new_song={this.props.new_song}/>
	}
}

export default Home;
