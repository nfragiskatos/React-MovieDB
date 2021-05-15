import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Movie from './SingleMovie';
import { proj } from './ProjectProperties';

function App() {
	return (
		<Switch>
			<Route exact path={proj.nav.home}>
				<Home />
			</Route>
			<Route path={proj.nav.movieDetails} children={<Movie />} />
		</Switch>
	);
}

export default App;
