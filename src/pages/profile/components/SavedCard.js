import React from 'react'
import {Link, useParams} from 'react-router-dom'
import Firebase from '../../../api/Place'
import {useSelector} from 'react-redux'
import isLogin from '../../../helpers/isLogin'

import Swal from '../../../helpers/Swal'

function SavedCard(props) {
    
    let {place} = props
    let {userId} = useParams()
    let currentUser = useSelector(state => state.user)
    let thisUser = isLogin(currentUser) && (userId === currentUser.uid)

    function removeSaved(placeId) {
        Swal.confirm({
            title: 'Hapus tempat yang telah disimpan?',
            icon: 'warning',
            confirmText: 'Ya, hapus'
        }, nextRemove)
        
        function nextRemove() {
            Swal.loading()

            let placeData = Object.assign({}, place)

            placeData.saved.forEach((saved, i) => {
                if(saved.uid === userId) {
                    placeData.saved.splice(i, 1)
                }
            })           
            Firebase.db.collection('places').doc(placeId).set(placeData)
            .then(() => {
                props.refreshPlace()
                Swal.swalert('Berhasil dihapus', '', 'success')
            }).catch(err => {
                Swal.swalert('Terjadi kesalahan', 'error')
                console.error("Error removing document: ", err);
            });
        }
    }

    return (
        <div className="card">
            <img src={place.images[0].src} className="card-img-top" height="150" alt="..." />
            <div className="card-body py-2 px-2">
                <h6 className="card-title text-primary">{place.name}</h6>
                <hr className="my-1" />
                <div className="d-flex">
                    {
                        thisUser ? 
                        <button className="btn btn-sm my-bg d-flex align-items-center mx-1" onClick={() => removeSaved(place.placeId)}>
                            <i className="material-icons text-white">bookmark_border</i>
                        </button> : null
                    }
                    <Link to={`/place/${place.placeId}`} className="btn btn-sm btn-success d-flex align-items-center mx-1">
                        <i className="material-icons text-white">remove_red_eye</i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SavedCard