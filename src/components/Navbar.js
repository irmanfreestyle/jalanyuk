import React from 'react'
import logo from '../assets/images/logo.svg'
import {Link} from 'react-router-dom'
import UserMenu from './UserMenu'

export default function Navbar(props) {    
    
    let {user, signOut} = props
    let authBtn    

    if(user !== null) {
        authBtn = <UserMenu signOut={signOut} />
    } else {
        authBtn = 
        <Link to="/auth" className="nav-link">
            <button type="button" className="btn my-bg btn-dark rounded-pill my-box-shadow rm-border">Login</button>
        </Link>        
    }
    
    return (
        <nav className="navbar fixed-top navbar-light navbar-expand-lg bg-white">
            <Link className="navbar-brand" to="/">            
                <img src={logo} width="30" height="30" alt="logo"></img>            
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/">About</a>
                    </li>
                    <li className="nav-item px-2">
                        <a className="nav-link" href="/">Contact</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        {authBtn}                        
                    </li>                                  
                </ul>
            </div>
        </nav>
    )
}