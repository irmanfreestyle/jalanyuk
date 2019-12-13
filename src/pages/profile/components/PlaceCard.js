import React from 'react'
import {useHistory, Link} from 'react-router-dom'
import toDate from '../../../helpers/toDate'

function PlaceCard(props) {
    let {place} = props
    let history = useHistory()
    
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
                            <div className="btn-group mx-2">
                                <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Atur
                                </button>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item text-success d-flex align-items-center" href="#">
                                        Edit tempat ini
                                    </a>                                    
                                    <a className="dropdown-item text-danger d-flex align-items-center" href="#">
                                        Hapus tempat ini                                        
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    )
}

export default PlaceCard