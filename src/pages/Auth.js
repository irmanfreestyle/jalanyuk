import React from 'react'
import Place from '../api/Place'

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

    function isExist(uid) {
        let status = false
        Place.db.collection("users").doc(uid)
        .get()
        .then(function(doc) {
            if (doc.exists) {
                status = true
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        return status
    }

    function login() {
        props.auth()
        .then(res => {            
            let userData = res.user
            if(!isExist(userData.uid)) {
                Place.db.collection("users").doc(userData.uid).set({
                    uid: userData.uid,
                    displayName: userData.displayName,
                    email: userData.email,
                    photoURL: userData.photoURL
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div style={styles.wrap}>            
            <button onClick={login} type="button" className="btn bg-white btn-light d-flex align-items-center">
                <img src="https://avatars.githubusercontent.com/u/1342004" width="20" alt="google icon" />&thinsp;
                Login dengan Google
            </button>
        </div>
    )
}