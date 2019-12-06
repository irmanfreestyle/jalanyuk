import React from 'react'

export default function Avatar(props) {
    const styles = {
        avatar: {
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            background: 'grey',
            padding: '8px',
            fontWeight: 'bold',
            borderRadius: '100%',            
        }
    }
    let {photoURL} = props
    
    return (
        <img width="35" height="35" src={photoURL} className="rounded-pill" alt="user image"/>
    )
}