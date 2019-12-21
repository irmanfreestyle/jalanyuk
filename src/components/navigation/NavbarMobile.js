import React from 'react'
import logo from '../../assets/images/logo.png'
import {Link} from 'react-router-dom'

function NavbarMobile(props) {
    let {user, signOut} = props    

    function logout() {
        if(window.confirm('Yakin ingin Keluar?')) {
            signOut()
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div>
            <div 
                className="d-flex justify-content-center py-2 bg-white"
                style={{
                    boxShadow:'1px 2px 4px rgba(0,0,0,0.5)',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    zIndex: '5'
                }}
            >
                <Link className="navbar-brand mr-0" to="/">            
                    <i className="material-icons text-primary" style={{fontSize:'40px'}}>terrain</i>                    
                </Link>
            </div>

            {/* BOTTOM NAV */}
            <div
                className="bg-white d-flex justify-content-around" 
                style={{
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    zIndex: '5',   
                    boxShadow: '-1px 2px 4px rgba(0,0,0,0.5)'                 
                }}
            >
                <Link to="/" className="w-100 py-3 px-3 text-center text-primary d-flex flex-column align-items-center">
                    <i className="material-icons">home</i>
                    <small>Beranda</small>
                </Link>
                <Link to={(user) ? `/profile/${user.uid}` : `/auth` } className="w-100 py-3 px-3 text-center text-primary d-flex flex-column align-items-center">
                    <i className="material-icons">person</i>
                    <small>Profil</small>
                </Link>
                <Link to="/create" className="w-100 py-3 px-3 text-center text-primary d-flex flex-column align-items-center">
                    <i className="material-icons">add_circle_outline</i>
                    <small>Upload</small>
                </Link>                
                
                {
                    user ? <div onClick={logout} className="pointer w-100 py-3 px-3 text-center text-primary d-flex flex-column align-items-center">
                        <i className="material-icons">exit_to_app</i>
                        <small>Keluar</small>
                    </div> : 
                    <Link to="/auth" className="pointer w-100 py-3 px-3 text-center text-primary d-flex flex-column align-items-center">
                        <i className="material-icons">keyboard_return</i>
                        <small>Login</small>
                    </Link>
                }
            </div>
        </div>
    )
}

export default NavbarMobile