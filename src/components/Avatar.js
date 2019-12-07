import React from 'react'

export default function Avatar(props) {
    let {photoURL, width, height} = props
    
    return (
        <img
            style={{boxShadow: '1px 1px 2px rgba(0,0,0,0.4)'}} 
            width={width} height={height} src={photoURL} className="rounded-pill" alt="user image"/>
    )
}