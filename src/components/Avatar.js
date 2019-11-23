import React from 'react'

export default function Avatar() {
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
    return (
        <div style={styles.avatar}>IU</div>
    )
}