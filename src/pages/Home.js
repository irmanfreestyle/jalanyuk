import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories'
import reviewsImg from '../assets/images/reviews.svg'
import savedImg from '../assets/images/saved.svg'
import postImg from '../assets/images/post.svg'

import holidayImg from '../assets/images/holiday.svg'

import NewDestination from '../components/NewDestination'
import PlacesReviewed from '../components/PlacesReviewed'

import MetaTags from 'react-meta-tags'

import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'


import Firebase from '../api/Place'

export default function Home() {    

    let currentUser = useSelector(state => state.user)
    let [newPlaces, setNewPlaces] = useState([])
    let [reviewedPlaces, setReviewedPlaces] = useState([])

    function getNewPlaces() {
        let tmpNewPlace = []
        Firebase.db.collection('places')
        .orderBy("created", "desc").limit(3)
        .get()
        .then(doc => {
            doc.forEach(place => {
                tmpNewPlace.push(place.data())
            })
        })
        .catch(err => {
            console.log(err)
        })
        setNewPlaces(tmpNewPlace)
    }

    async function getReviewedPlaces() {                
        try {
            let tmpReviewedPlaces = []
            let doc = await Firebase.db.collection('places').orderBy('created', 'desc').get()
            doc.forEach(place => {
                if(place.data().reviews.length) {
                    tmpReviewedPlaces.push(place.data())
                }
            })
            setReviewedPlaces(tmpReviewedPlaces)   
        } catch(err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        getNewPlaces()
        getReviewedPlaces()
    }, [])

    return (
        <div className="bg-white">   
            <MetaTags>
                <title>Home | JalanYuk</title>
                <meta name="description" content="Website untuk kamu yang hobi jalan-jalan dan liburan." />
                <meta property="og:title" content="Home | JalanYuk" />
                <meta property="og:image" content="../assets/logo.svg" />
            </MetaTags>         
            <div className="container">
                <Header />
                <Categories />                                            
            </div>           

            <div className="my-bg my-5">
                <div className="row align-items-center mx-0 py-3">
                    <div className="col-sx-12 col-md-6 py-2 d-flex justify-content-center">
                        <img src={holidayImg} width="350" style={{maxWidth:'100%'}} alt="review-img" />
                    </div>
                    <div className="col-sx-12 col-md-6 py-2">
                        <h4 className="text-white font-weight-bold">Bentar lagi liburan tahun baru nih!</h4>
                        <p className="text-white">
                            Sudah tau mau liburan ke mana? Apa pun itu, <br/> semoga liburanmu menyenangkan dan bermanfaat!
                        </p>
                    </div>
                </div>
            </div>

            <div className="my-5 container">
                <NewDestination places={newPlaces} />
                <div className="d-flex justify-content-center">
                    <Link to="/">
                        <button className="rounded-pill btn btn-sm btn-outline-danger">Lihat Selengkapnya</button>
                    </Link>
                </div>
            </div>

            <div className="my-bg">                
                <div className="container">
                    <h4 className="font-weight-bold text-white text-center py-4">Fitur yang bisa Kamu manfaatkan</h4>
                    
                    <div className="row">
                        <div className="py-4 col-xs-12 col-sm-6 col-md-4 d-flex flex-column align-items-center">
                            <img width="200" style={{maxHeight:'150px'}} src={reviewsImg} />
                            <h5 className="font-weight-bold text-white py-3">Review</h5>
                            <p className="text-center text-white">
                                Share pengalaman kamu dengan cara mereview tempat yang pernah kamu kunjungi
                            </p>
                        </div>
                        <div className="py-4 col-xs-12 col-sm-6 col-md-4 d-flex flex-column align-items-center">
                            <img width="200" style={{maxHeight:'150px'}} src={savedImg} />
                            <h5 className="font-weight-bold text-white py-3">Simpan</h5>
                            <p className="text-center text-white">
                                Simpan tempat yang menurut kamu menarik, siapa tau kamu akan mengunjunginya lain kali.
                                Kamu bisa melihat tempat yang disimpan pada profil.
                            </p>
                        </div>
                        <div className="py-4 col-xs-12 col-sm-6 col-md-4 d-flex flex-column align-items-center">
                            <img width="200" style={{maxHeight:'150px'}} src={postImg} />
                            <h5 className="font-weight-bold text-white py-3">Posting</h5>
                            <p className="text-center text-white">
                                Kamu bisa membagikan tempat-tempat menarik seperti obyek wisata dll.
                            </p>
                        </div>
                    </div>
                </div>
            </div>             
            
            <div className="my-5">
                <PlacesReviewed places={reviewedPlaces} />
                <div className="d-flex justify-content-center">
                    <Link to="/">
                        <button className="rounded-pill btn btn-sm btn-outline-danger">Lihat Selengkapnya</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}