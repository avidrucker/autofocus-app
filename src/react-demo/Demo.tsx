import React from 'react';

import { Switch, Route } from 'react-router-dom';

import AllScreensOrg from './AllScreensOrg';
import { prototypeMap } from './index';

function Demo() {
	const demoProp = {demo:"demo"};

  return (
    <main className="border-box">
			<Switch>
				{/* to-do: refactor route to be a dynamic list generated from array of paths*/}
				<Route
					exact path='/add-new'
					render={() => prototypeMap("add-new", demoProp)} />
				<Route
					exact path='/home'
					render={() => prototypeMap("home", demoProp)} />
				<Route
					exact path='/review'
					render={() => prototypeMap("review", demoProp)} />
				<Route
					exact path='/home-marked'
					render={() => prototypeMap("home-marked", demoProp)} />
				<Route
					exact path='/focus'
					render={() => prototypeMap("focus", demoProp)} />
				<Route
					exact path='/home-with-done'
					render={() => prototypeMap("home-with-done", demoProp)} />
				<Route
					exact path='/welcome'
					render={() => prototypeMap("welcome", demoProp)} />

				{/* PROTOTYPE DEMO ONLY ROUTES */}
				<Route
					exact path='/add-new-2'
					render={() => prototypeMap("add-new-2", demoProp)} />
				<Route
					exact path='/add-new-3'
					render={() => prototypeMap("add-new-3", demoProp)} />
				<Route
					exact path='/home-2'
					render={() => prototypeMap("home-2", demoProp)} />
				<Route
					exact path='/home-3'
					render={() => prototypeMap("home-3", demoProp)} />
				<Route
					exact path='/review-2'
					render={() => prototypeMap("review-2", demoProp)} />

				<Route
					path='/'
					component={AllScreensOrg} />		
			</Switch>
    </main>
  );
}

export default Demo;
