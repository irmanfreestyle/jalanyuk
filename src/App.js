import React from 'react';
import {BrowserRouter as Router, Switch, Route, } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Detail from './pages/Detail';
import ScrollIntoView from './components/ScrollIntoView';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="py-5 my-3">
        <ScrollIntoView>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/place/:placeId">
              <Detail/>
            </Route>
          </Switch>
        </ScrollIntoView>
      </div>
    </Router>
  );
}

export default App;
