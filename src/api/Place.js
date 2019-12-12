import {firebase} from '../firebaseConfig'
import 'firebase/storage'
import 'firebase/firestore'
const storage = firebase.storage()
const db = firebase.firestore()


class Place {
    constructor(props) {
        this.firebase = firebase
        this.storageRef = storage.ref()      
        this.db = firebase.firestore()  
    }
}

export default new Place()