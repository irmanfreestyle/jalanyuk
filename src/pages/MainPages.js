import React from 'react'
import {Switch, Route, } from 'react-router-dom'

import Home from './Home'
import Navbar from '../components/Navbar'
import Detail from './Detail';
import ScrollIntoView from '../components/ScrollIntoView';
import Search from './Search';
import Create from './Create'

export default function MainComponent(props) {    
  return (
    <div>
      <Navbar {...props} />
      <div className="py-5 my-3">
        <ScrollIntoView>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/place/:placeId">
              <Detail {...props} />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route to="/create">
              <Create />
            </Route>
          </Switch>
        </ScrollIntoView>
      </div>
    </div>
  )
}