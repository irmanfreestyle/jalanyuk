
const userReducer = (state = {}, action) => {    
    switch(action.type) {
        case 'SET_USER':                        
            state = action.payload
            return state
        case 'GET_USER': 
            return state.userData
        default:         
            return state
    }
}

export default userReducer