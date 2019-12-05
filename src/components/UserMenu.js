import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'

export default function UserMenu(props) {
    let signOut = props.signOut    

    const dispatch = useDispatch()

    function logout() {
        signOut()
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
        })
    }

    let [menu, setMenu] = useState(false)
    let cardMenu = !menu ? '' : 
        <div className="my-box-shadow d-flex flex-column" style={{
            position:'absolute',
            right: '0',            
            background: 'white',
            width: '200px'
        }}>
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