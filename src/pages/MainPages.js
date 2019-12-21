import React from 'react'
import {Switch, Route, } from 'react-router-dom'

import Home from './Home'
import NavbarDesktop from '../components/navigation/NavbarDesktop'
import NavbarMobile from '../components/navigation/NavbarMobile'
import Detail from './Detail'
import ScrollIntoView from '../components/ScrollIntoView'
import Filter from './Filter'
import Create from './Create'
import EditPlace from './EditPlace'
import Profile from './profile/Profile'

import {useMediaQuery} from 'react-responsive'
import Footer from '../components/navigation/Footer'

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
    <div className={useMediaQuery({maxWidth: 767}) ? 'pb-5' : ''}>
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
            <Route exact path="/filter/:category">
              <Filter />
            </Route>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route path="/edit/:placeId">
              <EditPlace />
            </Route>
            <Route exact path="/profile/:userId">
              <Profile />
            </Route>
          </Switch>
        </ScrollIntoView>
      </div>
      <Footer />
    </div>
  )
}