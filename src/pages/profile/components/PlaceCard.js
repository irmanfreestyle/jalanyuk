import React from 'react'
import {useHistory, Link, useParams} from 'react-router-dom'
import toDate from '../../../helpers/toDate'
import Firebase from '../../../api/Place'
import {useSelector} from 'react-redux'
import isLogin from '../../../helpers/isLogin'

function PlaceCard(props) {
    let {place, allPlace} = props
    let history = useHistory()
    let currentUser = useSelector(state => state.user)
    let {userId} = useParams()

    let thisUser = isLogin(currentUser) && (userId === currentUser.uid)


    function deletePlace(placeId) {
        if(window.confirm('Yakin hapus tempat ini?')) {
            Firebase.db.collection("places").doc(placeId)
            .delete()
            .then(() => {
                alert('Berhasil dihapus')
                props.refreshPlace()
            }).catch(err => {
                console.error("Error removing document: ", err);
            });
        }
    }
    
    return (
        <div className="card mb-3" style={{width:'100%'}}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={place.images[0].src} className="card-img" alt="altgan" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title text-primary">{place.name}</h5>
                        <p className="card-text">
                            {place.about}
                        </p>
                        <p className="card-text">
                            <small className="text-muted">Diposting pada </small>
                            <small className="text-primary font-weight-bold">{toDate(place.created)}</small>
                        </p>
                        <div>
                            <button onClick={() => history.push(`/place/${place.placeId}`)} className="btn btn-outline-danger btn-sm">
                                Lihat Tempat
                            </button>
                            {
                                (!thisUser) ? null : 
                                <div className="btn-group mx-2">
                                    <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Atur
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item text-success d-flex align-items-center" href="#">
                                            Edit tempat ini
                                        </a>                                    
                                        <div onClick={() => deletePlace(place.placeId)} className="pointer dropdown-item text-danger d-flex align-items-center" href="#">
                                            Hapus tempat ini                                        
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    )
}

export default PlaceCard