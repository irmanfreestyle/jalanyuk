import React from 'react'
import Line from './Line'
import Card from './Card'

export default function NewDestination(props) {
    
    let {places} = props

    return (
        <div>
            <div className="text-primary d-flex align-items-center">
                <i className="material-icons">library_add</i>&thinsp;
                Tempat Liburan Terbaru<br/>                
            </div>            
            <Line width="215px" />
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