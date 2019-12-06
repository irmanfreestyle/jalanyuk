function isLogin(currentUser) {
    if(currentUser === null || currentUser === undefined || !currentUser.hasOwnProperty('uid')) {        
        return false
    }        
    return true
}

export default isLogin