import React from 'react'

export default function Line(props) {
    return (
        <div style={{width:props.width, height: '3px', borderRadius: '10px'}} className={`my-1 ${props.color ? props.color : 'my-bg'}`}></div>
    )
}