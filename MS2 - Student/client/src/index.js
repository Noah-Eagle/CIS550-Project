import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';

import BoroughPage from './pages/BoroughPage';
import BoroughTrendsPage from './pages/BoroughTrendsPage';
import FilterPage from './pages/FilterPage';
import SearchPage from './pages/SearchPage';
import DashboardPage from './pages/DashboardPage';

import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

	
ReactDOM.render(
  <div>
    <Router>
      <Switch>
	    <Route exact path="/">
			<Redirect to="/dashboard"/>
		</Route>
        <Route exact
							path="/borough/summary"
							render={() => (
								<BoroughPage />
							)}/>
        <Route exact
							path="/borough/trends"
							render={() => (
								<BoroughTrendsPage />
							)}/>
		<Route exact
							path="/filter"
							render={() => ( 
								<FilterPage />
							)}/>
		<Route exact
							path="/search"
							render={() => (
								<SearchPage />
							)}/>
		<Route exact						
							path="/dashboard"
							render={() => (
								<DashboardPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

