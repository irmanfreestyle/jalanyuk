import React from 'react'

export default function Auth(props) {

    const styles = {
        wrap: {
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }

    return (
        <div style={styles.wrap}>            
            <button onClick={props.auth} type="button" className="btn bg-white btn-light d-flex align-items-center">
                <img src="https://avatars.githubusercontent.com/u/1342004" width="20" alt="google icon" />&thinsp;
                Login dengan Google
            </button>
        </div>
    )
}