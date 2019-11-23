import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import MainPages from './pages/MainPages'
import Auth from './pages/Auth';
import PrivateRoute from './pages/PrivateRoute'
import Loading from './components/Loading'

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true
    }
  }
  
  componentWillMount() {
    firebaseAppAuth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });        
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }


  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;    

    if(this.state.loading) {
      return <Loading />
    }
    return (
      <Router>
        <Switch>
          <PrivateRoute auth={signInWithGoogle} exact path="/auth" component={Auth} authenticated={this.state.authenticated}/>          
          <Route>
            <MainPages {...this.props} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default withFirebaseAuth({providers, firebaseAppAuth})(App);
