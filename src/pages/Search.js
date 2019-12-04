import React from 'react'
import { setUser } from '../_actions/user.actions';
import {useDispatch} from 'react-redux'

export default function Search(props) {

    const dispatch= useDispatch()    
    let setup = () => {
        dispatch(setUser({nama:'woi'}))
    }

    return (
        <div>
            <div className="my-bg text-white py-5">
                <div className="container font-weight-bold">
                    Hasil Pencarian "Candi Borobudur"
                </div>
            </div>
            <div className="container">                
                <div style={{width:'600px', maxWidth:'100%',margin:'auto', transform:'translateY(-30px)'}} className="py-3 px-3 my-box-shadow bg-white">
                    <div className="font-weight-bold text-primary">Yuk explore tempat lain</div>                    
                    <div className="d-flex">
                        <input type="text" className="form-control" placeholder="Cari yang lain yuk" />
                        <button className="btn my-bg rm-border btn-dark" onClick={setup}>Cari</button>
                    </div>
                </div>
            </div>
        </div>
    )
}