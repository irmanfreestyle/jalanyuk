import React, {useState, useEffect} from 'react'
import AddPhotos from '../components/AddPhotos'
import Place from '../api/Place'
import {Redirect, useParams} from 'react-router-dom'

import Firebase from '../api/Place'
import Loading from '../components/Loading'

import {useSelector} from 'react-redux'

import Swal from '../helpers/Swal'

export default function EditPlace(props) {
    let {placeId} = useParams()

    let [loading, setLoading] = useState(false)
    let [placeData, setPlaceData] = useState(null)

    let [placeIdRedirect, setPlaceIdRedirect] = useState('')
    let [toPlace, setToPlace] = useState(false)

    let [name, setName] = useState('')
    let [category, setCategory] = useState('')
    let [city, setCity] = useState('')
    let [address, setAddress] = useState('')
    let [about, setAbout] = useState('')    
    let [images, setImages] = useState([])    
    let [phone, setPhone] = useState('')    
    let [reviews, setReviews] = useState([])
    let [beenHere, setBeenHere] = useState([])
    let [saved, setSaved] = useState([])
    let user = useSelector(state => {
        let {uid, displayName, email, photoURL} = state.user || {}
        return {uid, displayName, email, photoURL}
    })

    let [days, setDays] = useState([
        {
            name: 'Minggu',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Senin',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Selasa',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Rabu',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Kamis',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Jumat',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Sabtu',
            active: false,
            open: '00:00',
            close: '00:00'
        }
    ])

    function getPlace() {
        Firebase.db.collection('places').doc(placeId)
        .get()
        .then(doc => {
            if(doc.exists) {
                setPlaceData(doc.data())

                // SETUP FIELDS
                setName(doc.data().name)
                setCategory(doc.data().category)
                setCity(doc.data().city)
                setAddress(doc.data().address)
                setAbout(doc.data().about)
                setImages(doc.data().images)
                setPhone(doc.data().phone)
                setDays(doc.data().days)
                setReviews(doc.data().reviews)
                setBeenHere(doc.data().beenHere)
                if(doc.data().saved !== undefined) setSaved(doc.data().saved)
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getPlace()
    }, [])
    

    function uploadImages(imageString) {
        const uuidv1 = require('uuid/v1')
        let imagesRef = Place.storageRef.child('placeImages').child(uuidv1())

        return new Promise((resolve, reject) => {
            imagesRef.putString(imageString, 'data_url').then(function(snapshot) {
                resolve(snapshot.ref.getDownloadURL())
            })
            .catch(err => {
                reject(err)
            })
        })
    }
    function setupImages(img, callback) {
        // FILTER IMAGES
        let currentImages = []
        let newImages = []
        img.forEach((image, i) => {
            let fill = image.src.split(':')
            if(fill[0] === 'https') {
                currentImages.push(image)
            } else {
                newImages.push(image)
            }
        })
        Promise.all(newImages.map(async (image) => {
            try {
                let src = await uploadImages(image.src)
                return {src}
            } catch(err) {
                console.log(err)
            }
        }))
        .then(values => {
            let resImage = currentImages.concat(values)
            return callback(resImage)
        })
        .catch(err => {
            console.log(err)
        })
    }
    //
    
    function updatePlace() {  
        setLoading(true)
        setupImages(images, (images) => {            
            Place.db.collection("places").doc(placeId).set({
                placeId,
                name,
                category,
                city,
                address,
                about,
                images,
                phone,
                days,
                reviews,
                beenHere,
                uploader: user,
                created: Date.now()
            })
            .then(res => {
                setLoading(false)
                Swal.swalert('Tempat berhasil diupdate', '', 'success')
                // redirect to place page
                // setPlaceIdRedirect(placeId)
                // setToPlace(true)
            })
            .catch(err => {
                setLoading(false)
                alert('Ada error gan')
                console.log(err)
            })
        })
    }

    function updateDays(index, time, condition) {
        let newData = [...days]        
        
        if(condition === 'open') {
            newData[index].open = time
        } else if(condition === 'close') {
            newData[index].close = time
        } else {
            newData[index].active = !newData[index].active
        }
        setDays(newData)
    }

    let openHours = days.map((day, index) => {
        return(
            <div key={index} className="border-bottom pb-2">
                <input onChange={() => updateDays(index)} checked={day.active} type="checkbox" className="custom-control-input " id={`day-${index}`} />
                <label className="custom-control-label text-black" htmlFor={`day-${index}`}>
                    {day.name}
                </label>
                {
                    !day.active ? '' : 
                    <div className="d-flex align-items-center">
                        <div>
                            <input onChange={(e) => updateDays(index, e.target.value, 'open')} type="text" className="form-control" placeholder="00:00" value={day.open}></input>
                            <small className="text-secondary">Jam Buka</small>
                        </div>
                        <div>
                            <input onChange={(e) => updateDays(index, e.target.value, 'close')} type="text" className="form-control" placeholder="00:00" value={day.close}></input>
                            <small className="text-secondary">Jam Tutup</small>
                        </div>
                    </div>
                }
            </div>
        )
    })


    let detailComponent = 
        <>
            <div>
                <div className="py-2">
                    <label className="font-weight-bold d-flex align-items-center">                            
                        <i className="material-icons">local_phone</i> &thinsp;
                        No Telepon
                    </label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" placeholder="Masukan no telepon" />
                </div>            
                <div className="py-2">
                    <label className="font-weight-bold d-flex align-items-center">                            
                        <i className="material-icons">access_time</i> &thinsp;
                        Jam Buka
                    </label>
                    <div className="custom-control custom-checkbox">
                        {openHours}
                    </div>
                </div>
            </div>
        </>

    if(toPlace) return <Redirect to={`/place/${placeIdRedirect}`} />
    if(!placeData) return <Loading />
    if(placeData) {        
        if(placeData.uploader.uid !== user.uid) return <Redirect to={'/'} />
    }

    return (
        <div>
            <div className="my-bg text-white py-5">
                <div className="container font-weight-bold">
                    Edit {placeData.name}
                    <div>
                        <small>Bagikan tempat wisata, hotel, atau restoran yang kamu tahu</small>
                    </div>
                </div>
            </div>
            <div className="container">                
                <div style={{
                    width:'600px', maxWidth:'100%',margin:'auto', transform:'translateY(-30px)'
                }} className="py-3 px-3 my-box-shadow bg-white text-primary">
                    <div className="py-2">
                        <label className="font-weight-bold d-flex align-items-center">
                            <i className="material-icons">store</i> &thinsp;
                            Nama Tempat
                        </label>
                        <input type="text" className="form-control" placeholder="Masukan nama tempat" onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div className="py-2">
                        <label className="font-weight-bold d-flex align-items-center">
                            <i className="material-icons">apps</i> &thinsp;
                            Kategori
                        </label>
                        <select value={category} className="form-control" onChange={(e) => setCategory(e.target.value)}>
                            <option>Pilih Kategori Tempat</option>
                            <option>Tempat Wisata</option>
                            <option>Restoran</option>
                            <option>Hotel</option>
                        </select>
                    </div>
                    <div className="py-2">
                        <label className="font-weight-bold d-flex align-items-center">                            
                            <i className="material-icons">location_city</i> &thinsp;
                            Kota
                        </label>
                        <input value={city} onChange={(e) => setCity(e.target.value)}  type="text" className="form-control" placeholder="Masukan Kota atau kabupaten" />
                    </div>
                    <div className="py-2">
                        <label className="font-weight-bold d-flex align-items-center">                            
                            <i className="material-icons">location_on</i> &thinsp;
                            Alamat lengkap
                        </label>
                        <input value={address} onChange={(e) => setAddress(e.target.value)}  type="text" className="form-control" placeholder="Masukan alamat tempat" />
                    </div>
                    <div className="py-2">
                        <label className="font-weight-bold d-flex align-items-center">                            
                            <i className="material-icons">info_outline</i> &thinsp;
                            Tentang Tempat
                        </label>
                        <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="form-control" rows="3" placeholder="Tulis deskripsi tempat"></textarea>
                    </div>                    
                    <div className="py-2">
                        <label className="font-weight-bold d-flex align-items-center">                            
                            <i className="material-icons">add_a_photo</i> &thinsp;
                            Tambahkan Foto Tempat
                        </label>
                        <AddPhotos photos={placeData.images} edit={true} sendToParent={(val) => setImages(val)} />
                    </div>

                    {detailComponent}

                    <hr/>

                    <div className="py-2">
                        <div className="ml-auto d-flex justify-content-end">
                            <button disabled={loading} onClick={updatePlace} className="rounded-lg d-flex align-items-center btn btn-sm my-bg btn-dark rm-border my-box-shadow">                            
                                <i style={loading?{display:'none'}:{}} className="material-icons">send</i>&thinsp;
                                <span style={!loading?{display:'none'}:{}} className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>&thinsp;
                                Update Tempat
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}