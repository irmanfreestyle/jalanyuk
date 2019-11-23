import React from 'react'
import iconHeader from '../assets/images/header.svg'

export default function Header() {
    const styles = {
        header: {
            height: '80vh',
            width: '100%',
            position: 'relative',            
            display: 'flex',
            alignItems: 'center',
        },
        icon: {
            position: 'absolute',
            right: '0',
            top: '',
            width: '600px',
            maxWidth: '100%',
            transform: 'translateX(-20%)',            
        },
        inputSearch: {
            background: 'white',
            position: 'relative',
            zIndex: '2',            
            display: 'flex',         
            justifyContent: 'space-between',
            height: '50px',
            maxWidth: '100%',            
            boxShadow: '0 5px 28px rgba(0,0,0,0.25), 0 0px 10px rgba(0,0,0,0.22)',
            input: {                       
                width: '100%',
                padding: '0 15px',
                boxSizing: 'border-box',
                height: '100%',
                border: 'none',
                outline: 'none',
                margin: '0px'
            }            
        }
    }

    return (
        <div style={styles.header}>
            <img style={styles.icon} src={iconHeader} alt="icon" />

            <div style={{position:'relative', zIndex:'3'}}>
                <h1>Siap berpetualang <br/> keliling Indonesia?</h1>
                <p className="text-primary">Kami siap mencari destinasi terbaik</p>
                <div style={styles.inputSearch} className="rounded-pill">                    
                    <input className="text-primary" placeholder="Mau kemana nih?" type="text" style={styles.inputSearch.input} />
                    <button className="btn my-bg btn-dark">
                        <i className="material-icons d-flex justify-content-center align-items-center">search</i>
                    </button>
                </div>
            </div>
        </div>
    )
}
