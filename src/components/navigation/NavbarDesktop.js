import React from 'react'
import logo from '../../assets/images/logo.png'
import {Link} from 'react-router-dom'
import UserMenu from '../UserMenu'

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
        <nav className="navbar fixed-top navbar-light navbar-expand-sm bg-white">
            <div className="container">
                <Link className="navbar-brand" to="/">            
                    <img src={logo} width="100" alt="logo"></img>            
                </Link>            
                <div className="collapse navbar-collapse" id="navbarNav">                
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <small><a className="nav-link text-primary" href="#">Tentang Kami</a></small>
                        </li>
                        <li className="nav-item">
                            <small><a className="nav-link text-primary" href="#">Kontak Developer</a></small>
                        </li>
                        <li className="nav-item">
                            {authBtn}                        
                        </li>                                  
                    </ul>
                </div>
            </div>
        </nav>
    )
}