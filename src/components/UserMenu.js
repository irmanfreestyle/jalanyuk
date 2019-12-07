import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Avatar from './Avatar'
import {useSelector} from 'react-redux'

export default function UserMenu(props) {
    let signOut = props.signOut    
    let currentUser = useSelector(state => state.user)

    function logout() {
        signOut()
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div style={{position:'relative', display:'inline-block'}}>
            <div className="dropdown">
                <button className="btn pl-0 btn-sm dropdown-toggle" type="button" id="drop-menu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Avatar width="30" height="30" photoURL={currentUser.photoURL} /> &thinsp;                    
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="drop-menu" style={{width:'200px'}}>
                <Link to="/profile" className="d-flex align-items-center py-2 px-3 text-secondary">
                    <i className="material-icons">person_outline</i>&thinsp;
                    Lihat Profil
                </Link>
                <Link to="/create" className="d-flex align-items-center py-2 px-3 text-success">
                    <i className="material-icons">send</i>&thinsp;
                    Posting Tempat
                </Link>
                <Link to="#" className="d-flex align-items-center py-2 px-3 text-danger" onClick={logout}>
                    <i className="material-icons">exit_to_app</i>&thinsp;
                    Logout
                </Link>
                </div>
            </div>
        </div>
    )
}