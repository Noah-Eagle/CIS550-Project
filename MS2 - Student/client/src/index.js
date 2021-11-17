import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import BoroughTrendsPage from './pages/BoroughTrendsPage';
import FilterPage from './pages/FilterPage';
// import MatchesPage from './pages/MatchesPage';

import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/home"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/borough-trends"
							render={() => (
								<BoroughTrendsPage />
							)}/>
		<Route exact
							path="/filter"
							render={() => (
								<FilterPage />
							)}/>
        {/* <Route exact
							path="/matches"
							render={() => (
								<MatchesPage />
							)}/> */}
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

