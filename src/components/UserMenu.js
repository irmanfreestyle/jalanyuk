import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export default function UserMenu(props) {
    let signOut = props.signOut

    let [menu, setMenu] = useState(false)
    let cardMenu = !menu ? '' : 
        <div className="my-box-shadow" style={{
            position:'absolute',
            right: '0',
            width: '100%',                
            background: 'white'
        }}>
        <Link to="/profile" className="py-1 px-2">Lihat Profil</Link>
        <div to="/profile" className="text-danger py-1 px-2" onClick={signOut}>Logout</div>
    </div> 

    return (
        <div style={{position:'relative', display:'inline-block'}}>
            <button onClick={() => setMenu(!menu)} className="btn btn-sm my-bg btn-dark rounded-lg rm-border d-flex align-items-center">
                @irmanfree
                <i className="material-icons">keyboard_arrow_down</i>
            </button>
            {cardMenu}
        </div>
    )
}