import React, {Component} from 'react';
import { HashRouter, Route, hashHistory, Switch } from 'react-router-dom';
import Home from '.././containers/Home/index.js';
import Artist from '.././containers/Artist/index.js';
import New from '.././containers/New/index.js';
import Rank from '.././containers/Rank/index.js';
import AlbumList from '.././components/Home/AlbumList.js';
import Album from '.././components/Home/Album.js';
import Play from '.././containers/Play/Play.js';
import Login from '.././containers/User/Login.js';
import Center from '.././containers/User/Center.js';
import Love from '.././containers/User/Love.js';
import RankList from '.././components/Rank/RankList.js';
const routes=()=>{
	return <div>
		<HashRouter history={hashHistory}>
			<Switch>
			  <Route exact path='/' component={Home}/>
			  <Route path='/artist' component={Artist}/>
			  <Route path='/new' component={New}/>
			  <Route path='/rank' exact component={Rank}/>
			  <Route path='/rank/list/:id' component={RankList}/>
			  <Route path='/login' component={Login}/>
			  <Route path='/center' component={Center}/>
			  <Route path='/love' component={Love}/>
			  <Route path='/albumList' component={AlbumList}/>
			  <Route path='/album/:id' component={Album}/>
			  <Route path='/play/:hash' component={Play}/>
			</Switch>
		</HashRouter>
	</div>
}
export default routes;