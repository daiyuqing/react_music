import React, {Component} from 'react';
import { HashRouter, Route, hashHistory, Switch } from 'react-router-dom';
import Home from 'containers/Home/index.js';
import Artist from 'containers/Artist/Artist.js';
import ArtistList from 'components/Artist/ArtistList.js';
import Singer from 'containers/Artist/Singer.js';
import New from 'containers/New/index.js';
import Rank from 'containers/Rank/Rank.js';
import AlbumList from 'containers/Home/AlbumList.js';
import Album from 'containers/Home/Album.js';
import Play from 'containers/Play/Play.js';
import Login from 'containers/User/Login.js';
import Center from 'containers/User/Center.js';
import Love from 'containers/User/Love.js';
import RankList from 'components/Rank/RankList.js';
import Search from 'containers/Search/Search.js';
import SearchResult from 'containers/Search/SearchResult.js';
import Player from 'containers/Play/Player.js';
import Nav from 'containers/common/Nav.js';
const routes=()=>{
	return <div>
		<Player/>
		<HashRouter history={hashHistory}>
			<Switch>
			    <Route exact path='/' component={Nav}/>
			    <Route path='/artist' exact component={Artist}/>
			    <Route path='/artist/list/:classid' exact component={ArtistList}/>
			    <Route path='/artist/list/singer/:singerid' component={Singer}/>
			    <Route path='/new' component={New}/>
			    <Route path='/rank' exact component={Rank}/>
			    <Route path='/rank/list/:id' component={RankList}/>
			    <Route path='/user/login' component={Login}/>
			    <Route path='/user/center' component={Center}/>
			    <Route path='/user/love' component={Love}/>
			    <Route path='/albumList' component={AlbumList}/>
			    <Route path='/album/:id' component={Album}/>
			    <Route path='/play/:hash' component={Play}/>
			    <Route path='/search' exact component={Search}/>
			    <Route path='/search/result' component={SearchResult}/>
			</Switch>
		</HashRouter>
	</div>
}
export default routes;