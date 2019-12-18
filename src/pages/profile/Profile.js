import React, {useEffect, useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
import MetaTags from 'react-meta-tags'
import {useSelector} from 'react-redux'
import Avatar from '../../components/Avatar'
import Firebase from '../../api/Place'
import Loading from '../../components/Loading'
import ReviewCard from './components/ReviewCard'
import PlaceCard from './components/PlaceCard'
import SavedCard from './components/SavedCard'

function Profile() {
    let {userId} = useParams()
    let prevUserId = usePrevious(userId)

    let [thisUser, setThisUser] = useState(null) //USER DARI USER ID URL
    let [places, setPlaces] = useState(null)
    let [allPlace, setAllPlace] = useState(null)
    let [reviews, setReviews] = useState(null)
    let [savedPlaces, setSavedPlaces] = useState(null)

    let currentUser = useSelector(state => state.user) //USER YANG LOGIN
    let isUserPage = (userId === currentUser.uid)

    //Hook
    function usePrevious(userId) {
        const ref = useRef()

        useEffect(() => {
            ref.current = userId            
        }, [userId])

        return ref.current
    }

    function getUser() {
        Firebase.db.collection("users").doc(userId)                
        .onSnapshot(function(doc) {            
            setThisUser(doc.data())
        });
    }

    function getPlace() {        
        let tmpPlaces = []
        let tmpReviews = []        
        let tmpAllPlace = []
        let tmpSaved = []
        Firebase.db.collection("places")
        .onSnapshot(function(snapshot) {                  
            snapshot.forEach(doc => {
                tmpAllPlace.push(doc.data())
                if(doc.data().uploader.uid === userId) {                    
                    tmpPlaces.push(doc.data())
                }
                doc.data().reviews.forEach(review => {
                    if(review.reviewer.uid === userId) {
                        review.place = doc.data()
                        tmpReviews.push(review)
                    }
                })
                
                if(doc.data().saved !== undefined) {
                    doc.data().saved.forEach(saved => {
                        if(saved.uid === userId) {
                            tmpSaved.push(doc.data())
                        }
                    })
                }
            })
            
            setAllPlace(tmpAllPlace)
            setReviews(tmpReviews)
            setPlaces(tmpPlaces)
            setSavedPlaces(tmpSaved)
        }); 
    }

    if(prevUserId !== userId) {
        getUser()
        getPlace()
    }
    
    useEffect(() => {
        getUser()
        getPlace()
    }, [])

    if(thisUser === null || reviews === null || places === null || savedPlaces === null) {
        return <Loading />
    }

    return (
        <div style={{background: '#F3F3F3'}}>
            <MetaTags>
                <title>Profil {thisUser.displayName} | JalanYuk</title>
                <meta name="description" content="Website untuk kamu yang hobi jalan-jalan dan liburan." />
                <meta property="og:title" content="Detail tempat" />
                <meta property="og:image" content="../assets/logo.png" />
            </MetaTags>  
            <div className="container bg-white py-5 text-center">
                <Avatar photoURL={thisUser.photoURL} width="100" height="100" />
                <h3 className="py-2">{thisUser.displayName}</h3>
                {/* {isUserPage ? <button className="btn btn-outline-danger btn-sm">Edit Profil</button> : null} */}
            </div>
            <div className="my-2 container px-0">
                <ul className="nav nav-pills bg-white mb-2 py-2 px-2" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="upload-tab" data-toggle="tab" href="#upload" role="tab" aria-controls="upload" aria-selected="true">Tempat diupload</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review" aria-selected="false">Review</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="saved-tab" data-toggle="tab" href="#saved" role="tab" aria-controls="saved" aria-selected="false">Tempat Disimpan</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="upload" role="tabpanel" aria-labelledby="upload-tab">
                        <div className="bg-white py-2 px-2">
                            {
                                places.map((place, i) => {
                                    return <PlaceCard refreshPlace={getPlace} key={i} place={place} allPlace={allPlace} />
                                })
                            }                            
                        </div>
                    </div>
                    <div className="tab-pane fade" id="review" role="tabpanel" aria-labelledby="review-tab">
                        {
                            reviews.map((review, i) => {
                                return (
                                    <ReviewCard refreshPlace={getPlace} edit={isUserPage} key={i} review={review}/>
                                )
                            })
                        }
                    </div>
                    <div className="tab-pane fade" id="saved" role="tabpanel" aria-labelledby="saved-tab">
                        <div className="row bg-white px-2 py-2 mx-0">
                            {
                                !savedPlaces.length ? <div className="w-100 py-3 px-3 mb-0 text-primary text-center">Belum ada tempat yang disimpan</div> :
                                savedPlaces.map((saved, i) => {
                                    return (
                                        <div key={i} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                            <SavedCard refreshPlace={getPlace} place={saved}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile