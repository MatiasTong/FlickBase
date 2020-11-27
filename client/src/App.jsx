import React from "react"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import './App.css';

function App() {
  return(
  <Router>
    <Switch>
      {/* "exact" is needed in this route, otherwise it would match all paths starting with "/" */}
      {/* Route paths go here */}
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/MovieDetails/:movieID">
        <MovieDetails />
      </Route>
    </Switch>
  </Router>
  )
}

export default App;
