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
    //
    // uploadImages(imageString) {
    //     let imagesRef = this.storageRef.child('placeImages').child(uuidv1())

    //     return new Promise((resolve, reject) => {
    //         imagesRef.putString(imageString, 'data_url').then(function(snapshot) {
    //             resolve(snapshot.ref.getDownloadURL())
    //         })
    //         .catch(err => {
    //             reject(err)
    //         })
    //     })
    // }
    // setupImages(images, callback) {
    //     Promise.all(images.map(async (image) => {
    //         try {
    //             let src = await this.uploadImages(image.src)
    //             return {src}
    //         } catch(err) {
    //             console.log(err)
    //         }
    //     }))
    //     .then(values => {
    //         return callback(values)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }
    // //
    
    // postPlace(data) {  
    //     return new Promise((resolve, reject) => {
    //         this.setupImages(data.images, (images) => {
    //             data.images = images            
    //             this.db.collection("places").add({
    //                 name: data.name,
    //                 category: data.category,
    //                 address: data.address,
    //                 about: data.about,
    //                 images: data.images,
    //                 phone: data.phone,                    
    //                 days: data.days,
    //                 reviews: data.reviews,
    //                 beenHere: data.beenHere,
    //                 user: data.user,
    //                 created: Date.now()
    //             })
    //             .then(res => {
    //                 resolve(res)
    //             })
    //             .catch(err => {
    //                 reject(err)
    //             })
    //         })
    //     })
    // }

    // beenHere(data) {
    //     let ref = db.collection('places').doc(data.placeId);        
    //     if(data.act === 'delete') {
    //         return ref.update({
    //             beenHere: firebase.firestore.FieldValue.arrayRemove(data.user)
    //         })
    //     }
    //     return ref.update({
    //         beenHere: firebase.firestore.FieldValue.arrayUnion(data.user)
    //     })
    // }
}

export default new Place()