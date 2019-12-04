import React, {useState, useEffect} from 'react'
import Slider from 'react-slick'
import MetaTags from 'react-meta-tags'
import Avatar from '../components/Avatar'
import ReviewModal from '../components/ReviewModal'
import Rate from '../components/Rate'
import Loading from '../components/Loading'

import {useParams} from 'react-router-dom'
import Place from '../api/Place'

import {useSelector} from 'react-redux'

function Detail(props) {
    let currentUser = useSelector(state => state.user)    
    let {placeId} = useParams()
    let [place, setPlace] = useState(null)
    let [activeSlide, setActiveSlide] = useState(0)    
    let [beenHereLoading, setBeenHereLoading] = useState(
        <i className="material-icons">directions_walk</i>
    )
    let [hasBeenHere, setHasBeenHere] = useState(false)
    let [noReviews, setNoReviews] = useState('')


    function toDate(miliseconds) {
        let date = new Date(miliseconds);
        // let res = date.toString("dd MMM"); // "Dec 20"        
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

    function getPlace() {
        Place.db.collection("places").doc(placeId)                
        .onSnapshot(function(doc) {            
            setPlace(doc.data())
            initBeenHere(doc.data())

            setNoReviews(doc.data().reviews.length ? null :
                <div className="py-2 px-2 text-secondary">Tidak ada review</div>)
        });        
    }

    function setActiveSlideFunc(index) {
        setActiveSlide(index)
    }
    
    function initBeenHere(placeData) {               
        let status = false        
        if(currentUser !== null) {            
            placeData.beenHere.forEach(here => {                
                if(here.uid === currentUser.uid) {                
                    status = true
                }
            })
        }
        setHasBeenHere(status)
    }

    async function toggleBeenHere() {
        setBeenHereLoading(
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        )
        let act = 'add' 
        if(place.beenHere.length) {
            place.beenHere.forEach(been => {
                if(been.uid === currentUser.uid) {                        
                    act = 'delete'
                }                
            })
        }            
        
        let ref = Place.db.collection('places').doc(placeId);
        if(act === 'delete') {
            ref.update({beenHere: Place.firebase.firestore.FieldValue.arrayRemove(place.uploader)})
            .then(res => {
                console.log('Success update beenhere')
                setBeenHereLoading(
                    <i className="material-icons">directions_walk</i>
                )                
            })
            .catch(err => {
                console.log(err)
                setBeenHereLoading(
                    <i className="material-icons">directions_walk</i>
                )
            })                
        } else {
            ref.update({beenHere: Place.firebase.firestore.FieldValue.arrayUnion(place.uploader)})
            .then(res => {
                console.log('Success update beenhere')
                setBeenHereLoading(
                    <i className="material-icons">directions_walk</i>
                )                
            })
            .catch(err => {
                console.log(err)
                setBeenHereLoading(
                    <i className="material-icons">directions_walk</i>
                )
            })    
        }                    
    }

    const sliderOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slideToScroll: 1        
    }

    useEffect(() => {
        getPlace()
    }, [])

    if(place === null || currentUser === null) return <Loading/>
    return (
        <div style={{background: '#F3F3F3'}}>
            <MetaTags>
                <title>Detail tempat | JalanYuk</title>
                <meta name="description" content="Website untuk kamu yang hobi jalan-jalan dan liburan." />
                <meta property="og:title" content="Detail tempat" />
                <meta property="og:image" content="../assets/logo.svg" />
            </MetaTags>  
            <div className="container py-5">
                <div className="row">
                    <div className="col-sm-12 col-md-8 px-1">
                        <div className="bg-white py-2 mb-1 px-3">
                            <div className="mb-1">
                                <h3 className="font-weight-bold mb-0">{place.name}</h3>
                                
                            </div>                            
                            <div className="my-1 d-flex align-items-center text-primary">
                                <i className="material-icons">location_on</i>&thinsp;
                                {place.address}
                            </div>
                            <div style={{position:'relative', fontSize:'12px'}}>
                                <img width="100%" src={place.images[activeSlide].src} className="img-fluid" alt="place image0"/>
                                <div 
                                    className="rounded-pill my-bg text-white px-2 py-1 d-flex align-items-center"
                                    style={{position:'absolute', right:'5px',top:'5px'}}>
                                    <i className="material-icons" style={{fontSize:'20px'}}>label_outline</i>
                                        &thinsp;
                                        {place.category}
                                </div>
                            </div>

                            <div style={{width:'350px'}} className="pt-2">
                                <Slider {...sliderOptions}>                                
                                    {
                                        place.images.map((image, i) => {
                                            return (
                                                <div className="pr-1" key={i} onClick={()=>setActiveSlideFunc(i)}>
                                                    <img  
                                                    alt="slider"
                                                    style={
                                                        i === activeSlide? {border:'3px solid red'} : {}
                                                    }
                                                    width="100%" height="70" src={image.src} />
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>    

                            <div className="my-2 d-flex align-items-center flex-wrap">
                                <ReviewModal place={place} />
                                <button type="button" className="btn mr-2 btn-sm d-flex align-items-center btn-outline-secondary">
                                    <i className="material-icons">bookmark_border</i>&thinsp;
                                    Simpan Tempat
                                </button>
                                <button onClick={toggleBeenHere} type="button" className={"btn mr-2 btn-sm d-flex align-items-center "+(hasBeenHere?'btn-outline-danger':'btn-outline-secondary')}>
                                    {beenHereLoading}                                    
                                    &thinsp;
                                    Pernah Kesini
                                </button>
                            </div>
                        </div>  
                    </div>
                    
                    <div className="col-sm-12 col-md-4 px-1">
                        <div className="bg-white mb-1 py-2 px-2 text-secondary d-flex align-items-center">
                            Diupload oleh &thinsp;
                                <span className="text-primary">{place.uploader.displayName}</span>
                        </div>

                        <div className="bg-white mb-1 px-2 py-2" style={{position: 'sticky', top: '75px'}}>
                            <span className="font-weight-bold">Info tempat</span>
                            <div className="d-flex py-2 text-primary">
                                <i className="material-icons">location_on</i>&thinsp;
                                <div>
                                    <div>Lokasi Tempat</div>
                                    <small className="text-secondary">
                                        {place.address}
                                    </small>
                                </div>
                            </div>

                            <div className="d-flex py-2 text-primary">
                                <i className="material-icons">av_timer</i> &thinsp;
                                <div>
                                    <div>Jam Buka</div>
                                    <div className="text-secondary">
                                        {
                                            place.days.map((day, i) => {
                                                return (
                                                    <div key={i} className="d-flex align-items-center">
                                                        <div style={{width:'80px'}}>
                                                            <small>{day.name}</small>
                                                        </div>
                                                        <div style={day.active?{}:{display:'none'}}>
                                                            <small className="font-weight-bold">
                                                                {day.open}
                                                            </small>
                                                            <small className="px-1">-</small>
                                                            <small className="font-weight-bold">{day.close}</small>
                                                        </div>
                                                        <small className="font-weight-bold" style={!day.active?{}:{display:'none'}}>Tutup</small>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex py-2 text-primary">
                                <i className="material-icons">local_phone</i>&thinsp;
                                <div>
                                    <div>Nomor Telepon</div>
                                    <small className="text-secondary">
                                        {place.phone || '-'}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-1 py-2 col-sm-12 col-md-8">
                        <div className="bg-white px-3 py-3">
                            <div className="font-weight-bold text-primary d-flex align-items-center">
                                <i className="material-icons">info_outline</i>&thinsp;
                                Tentang Tempat
                            </div>
                            <p className="text-secondary pt-2">
                                {place.about}
                            </p>
                        </div>
                        
                    </div><div className="px-3 py-2 mb-1 col-sm-12 col-md-4"/>

                    <div className="px-1 py-2 mb-1 col-sm-12 col-md-8">
                        <div className="bg-white px-3 py-3 bg-white">
                            <div className="font-weight-bold text-primary d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <i className="material-icons">rate_review</i>&thinsp;
                                    Review
                                </div>
                                {/* <div>
                                    <ReviewModal />
                                </div> */}
                            </div>
                            {noReviews}
                            {
                                place.reviews.map((review, i) => {
                                    return (
                                        <div key={i} className="py-3 px-3 my-3" style={{background:'#F7F7F7'}}>
                                            <div className="d-flex w-100">
                                                <Avatar />
                                                <div className="px-2">
                                                    <div className="text-primary font-weight-bold">{review.reviewer.displayName}</div>
                                                    <small className="text-secondary">
                                                        {toDate(review.created)}
                                                    </small>
                                                </div>                                    
                                                <Rate value={review.star} />
                                            </div>
                                            <p className="pt-2">
                                                {review.content}
                                            </p>
                                        </div>
                                    )
                                })
                            }                            
                        </div>
                    </div><div className="px-3 py-2 mb-1 col-sm-12 col-md-4 px-1"/>

                </div>
            </div>
        </div>
    )
}

export default Detail