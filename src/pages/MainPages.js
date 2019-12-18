import React from 'react'
import {Switch, Route, } from 'react-router-dom'

import Home from './Home'
import NavbarDesktop from '../components/navigation/NavbarDesktop'
import NavbarMobile from '../components/navigation/NavbarMobile'
import Detail from './Detail'
import ScrollIntoView from '../components/ScrollIntoView'
import Search from './Search'
import Create from './Create'
import Profile from './profile/Profile'

import {useMediaQuery} from 'react-responsive'

export default function MainComponent(props) {    
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  const Desktop = ({ children }) => {
    const isMobile = useMediaQuery({ minWidth: 767 })
    return isMobile ? children : null
  }

  return (
    <div>
      <Desktop>
        <NavbarDesktop {...props} />
      </Desktop>
      <Mobile>
        <NavbarMobile {...props} />
      </Mobile>


      <div className="pt-5 mt-3" style={{background: '#F3F3F3', minHeight: '100vh'}}>
        <ScrollIntoView>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/place/:placeId">
              <Detail {...props} />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/create/:editmode?">
              <Create />
            </Route>
            <Route exact path="/profile/:userId">
              <Profile />
            </Route>
          </Switch>
        </ScrollIntoView>
      </div>
    </div>
  )
}