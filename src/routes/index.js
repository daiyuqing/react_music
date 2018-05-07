import React, {Component} from 'react';
import { HashRouter, Route, hashHistory, Switch } from 'react-router-dom';
import Home from '.././containers/Home/index.js';
import Artist from '.././containers/Artist/index.js';
import New from '.././containers/New/index.js';
import Rank from '.././containers/Rank/index.js';
import AlbumList from '.././components/Home/AlbumList.js';
const routes=()=>{
	return <div>
		<HashRouter history={hashHistory}>
			<Switch>
			  <Route exact path='/' component={Home}/>
			  <Route path='/artist' component={Artist}/>
			  <Route path='/new' component={New}/>
			  <Route path='/rank' component={Rank}/>
			  <Route path='/albumList' component={AlbumList}/>
			</Switch>
		</HashRouter>
	</div>
}
export default routes;