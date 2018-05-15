import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../.././actions/music.js';
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
                    let collection=localStorage.getItem('collection');
                    let new_song=result.data;
                    if (collection) {
                        for(let i in new_song){
                            if (collection.indexOf(new_song[i].audio_id)>-1) {
                                new_song[i].collected=true;
                            }
                        }
                    }
					this.props.actions.update_new_song(new_song);
					this.props.actions.update_banner(result.banner);
                    fetch('/kugou/plist/index?json=true').then( (res) => res.json()).then(
                        (result)=>{
                            this.props.actions.update_plist(result.plist.list.info);
                        },(error)=>{
                            console.log(error);
                        }
                    );
                },(error)=>{
                    console.log(error);
                }
            );
        }catch(e){
            
        }
    }
	render(){
		return(<div>
				<Header/>
				<Nav page='home'/>
				<Recommend plist={this.props.plist} banner={this.props.banner} new_song={this.props.new_song}/>
			</div>)
	}
}

export default connect(
  	(state)=>state.Music,
    (dispatch)=>({
        actions:bindActionCreators(actions, dispatch)
    })
)(Home);