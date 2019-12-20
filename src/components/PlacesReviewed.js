import React from 'react'
import Line from './Line'
import Card from './Card'

export default function PlacesReviewed(props) {

    let {places} = props

    return (
        <div className="container">
            <div className="text-primary d-flex align-items-center">
                <i className="material-icons">rate_review</i>&thinsp;
                Tempat yang Telah di Review<br/>                
            </div>            
            <Line width="230px" />
            <br/>
            <div className="row">
                {
                    places.map(place => {
                        return (
                            <div key={place.placeId} className="col-sm-6 col-md-6 col-lg-4">
                                <Card place={place} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}