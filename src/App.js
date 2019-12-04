import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import MainPages from './pages/MainPages'
import Auth from './pages/Auth';
import PrivateRoute from './pages/PrivateRoute'
import Loading from './components/Loading'

import {firebase, firebaseApp} from './firebaseConfig'
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';

// REDUX
import { connect } from 'react-redux';
import {setUser} from './_actions/user.actions'


const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }
  
  UNSAFE_componentWillMount() {      
    firebaseAppAuth.onAuthStateChanged(user => {
      if (user) {
        this.props.dispatch(setUser(user))
        this.setState({          
          loading: false
        });                
      } else {
        this.setState({          
          loading: false
        });
      }
    });
  }

  render() {    
    const {      
      signInWithGoogle,
    } = this.props;            

    if(this.state.loading) {
      return <Loading />
    }
    return (
      <Router>
        <Switch>
          <PrivateRoute auth={signInWithGoogle} exact path="/auth" component={Auth} authenticated={this.props.user!==null ? true : false}/>          
          <Route>
            <MainPages {...this.props} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default withFirebaseAuth({providers, firebaseAppAuth})(connect()(App));
