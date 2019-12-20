import React from 'react'
import {Link} from 'react-router-dom'

export default function Card(props) {    
    let {place} = props

    const styles = {
        card: {            
            maxWidth: '100%',
            border: 'none',
            borderRadius: '15px',
        },
        cardBody: {
            position: 'relative',            
            button: {
                position: 'absolute',
                top: '-20px',        
                left: '0',
                right: '0',
                margin: 'auto',
                display: 'flex',                
                alignItems: 'center',
            },
            img: {
                borderRadius: '15px',
                boxShadow: '0 5px 28px rgba(0,0,0,0.2), 0 0px 10px rgba(0,0,0,0.2)'
            }
        }
    }
   
    return (
        <div className="card" style={styles.card}>
            <img src={place.images[0].src} className="card-img-top" alt={place.name} style={styles.cardBody.img} height="165px" />
            <div className="card-body text-center" style={styles.cardBody}>
                <Link to={`/place/${place.placeId}`}>
                    <button style={styles.cardBody.button} className="my-box-shadow btn text-primary bg-white rounded-pill">
                        Lihat Tempat
                        <i className="material-icons">navigate_next</i>
                    </button>
                </Link>
                <h5 className="mb-0 py-2">{place.name}</h5>
                <p className="text-primary d-flex align-items-center justify-content-center">
                    <i className="material-icons">location_on</i>
                    {place.city}
                </p>                
            </div>
        </div>

    )
}