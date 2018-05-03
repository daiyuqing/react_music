import React, {Component} from 'react';
import { HashRouter, Route, hashHistory, Switch } from 'react-router-dom';
import Home from '.././containers/Home/index.js';
import Artist from '.././containers/Artist/index.js';
import New from '.././containers/New/index.js';
const routes=()=>{
	return <div>
		<HashRouter history={hashHistory}>
			<Switch>
			  <Route exact path='/' component={Home}/>
			  <Route path='/artist' component={Artist}/>
			  <Route path='/new' component={New}/>
			</Switch>
		</HashRouter>
	</div>
}
export default routes;