import React from 'react'
import {Link} from 'react-router-dom'

export default function Categories() {
    const styles = {
        wrap: {
            margin: 'auto',
            width: '500px',
            maxWidth: '100%',                        
            overflow: 'hidden'
        },
        child: {
            textAlign: 'center',
            width: '100%',            
        }
    }

    return (
        <div className="rounded-pill my-box-shadow d-flex justify-content-between align-items-center" style={styles.wrap}>
            <div style={styles.child}>
                <Link to="/filter/tempatwisata" className="text-white">
                    <button className="btn btn-dark my-bg d-flex flex-column align-items-center w-100 py-2 rm-border px-2">
                        <i className="material-icons">airplanemode_active</i>
                        Wisata       
                    </button>
                </Link>         
            </div>
            <div style={styles.child}>
                <Link to="/filter/hotel" className="text-white">
                    <button className="border-left border-right btn btn-dark my-bg d-flex flex-column align-items-center w-100 py-2 px-2 border-bottom-0 border-top-0">
                        <i className="material-icons">hotel</i>
                        Hotel
                    </button>
                </Link>
            </div>
            <div style={styles.child}>
                <Link to="/filter/restoran" className="text-white">
                    <button className="btn btn-dark my-bg d-flex flex-column align-items-center w-100 py-2 rm-border px-2">                        
                        <i className="material-icons">restaurant_menu</i>
                        Restoran
                    </button>
                </Link>
            </div>            
        </div>
    )
}