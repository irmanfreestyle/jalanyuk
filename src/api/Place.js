import {firebase} from '../firebaseConfig'
import 'firebase/storage'
import 'firebase/firestore'
const storage = firebase.storage()
const uuidv1 = require('uuid/v1')

class Place {
    constructor(props) {
        this.storageRef = storage.ref()      
        this.db = firebase.firestore()  
    }
    //
    uploadImages(imageString) {
        let imagesRef = this.storageRef.child('placeImages').child(uuidv1())

        return new Promise((resolve, reject) => {
            imagesRef.putString(imageString, 'data_url').then(function(snapshot) {
                resolve(snapshot.ref.getDownloadURL())
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    setupImages(images, callback) {
        Promise.all(images.map(async (image) => {
            try {
                let src = await this.uploadImages(image.src)
                return {src}
            } catch(err) {
                console.log(err)
            }
        }))
        .then(values => {
            return callback(values)
        })
        .catch(err => {
            console.log(err)
        })
    }
    //
    
    postPlace(data) {  
        this.setupImages(data.images, (images) => {
            data.images = images
            this.db.collection("users").add({
                name: data.name,
                category: data.category,
                address: data.address,
                about: data.about,
                images: data.images,
                phone: data.phone,
                web: data.web,
                days: data.days,
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        })
    }
}

export default new Place()