import {combineReducers} from 'redux'
import userReducer from './user.reducer'
import firebaseReducer from './firebase.reducers'

const allReducers = combineReducers({    
    user: userReducer,
    firebase: firebaseReducer
})

export default allReducers