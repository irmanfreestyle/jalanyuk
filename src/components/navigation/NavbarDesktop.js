import React, {useState, useEffect} from 'react'
import logo from '../../assets/images/logo.png'
import {Link} from 'react-router-dom'
import UserMenu from '../UserMenu'

export default function Navbar(props) {    

    let [windowScroll, setWindowScroll] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            setWindowScroll(window.pageYOffset)
        })
    }, [])
    
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
        <nav style={(windowScroll > 585) ? {boxShadow:'2px 3px 5px rgba(0,0,0,0.3)'} : {}} className="navbar fixed-top navbar-light navbar-expand-sm bg-white">
            <div className="container">                
                <Link className="navbar-brand d-flex align-items-center" to="/">            
                    <i className="material-icons text-primary" style={{fontSize:'40px'}}>terrain</i>
                    &thinsp;
                    <small className="text-primary font-weight-bold">Jalan Yuk</small>
                </Link>            
                <div className="collapse navbar-collapse" id="navbarNav">                
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            {authBtn}                        
                        </li>                                  
                    </ul>
                </div>
            </div>
        </nav>
    )
}