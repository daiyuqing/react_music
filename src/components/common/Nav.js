
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Tabs } from 'element-react';
import Home from 'containers/Home/index.js';
import Artist from 'containers/Artist/Artist.js';
import New from 'containers/New/index.js';
import Rank from 'containers/Rank/Rank.js';
import Header from 'components/common/Header.js';
class Nav extends Component{
	render(){
		return (
			<div style={{width:'10rem'}}>
				<Header playing={this.props.playing}/>
			    <Tabs activeName={this.props.tabIndex} onTabClick={ (tab) => this.props.actions.update_tabIndex(tab.props.name) }>
			        <Tabs.Pane label="个性推荐" name="1">
			        	<Home/>
			        </Tabs.Pane>
			        <Tabs.Pane label="新歌" name="2">
			        	<New/>
			        </Tabs.Pane>
			        <Tabs.Pane label="排行榜" name="3">
			        	<Rank/>
			        </Tabs.Pane>
			        <Tabs.Pane label="歌手" name="4">
			        	<Artist/>
			        </Tabs.Pane>
			    </Tabs>
			</div>
		  )
	}
}


export default Nav;