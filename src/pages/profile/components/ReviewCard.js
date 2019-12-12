import React, {useState} from 'react'
import Avatar from '../../../components/Avatar'
import toDate from '../../../helpers/toDate'
import Rate from '../../../components/Rate'

import Place from '../../../api/Place'

import {Link} from 'react-router-dom'
import UpdateReviewModal from './UpdateReviewModal'

function ReviewCard(props) {
    let {review, edit} = props    
    let [renderRate, setRenderRate] = useState(true)    
    

    function forceRenderRate(bool) {
        setTimeout(() => {
            setRenderRate(bool)
        }, 1000)
    }


    function deleteReview(place, reviewId) {        
        let placeId = place.placeId
        let placeData = Object.assign({}, place)
        
        placeData.reviews.forEach((rev, index) => {
            if(rev.reviewId === reviewId) {
                placeData.reviews.splice(index, 1)
            }
        })        

        if(window.confirm('Yakin hapus review ini?')) {
            Place.db.collection("places").doc(placeId).set(placeData)
            .then(() => {
                props.refreshPlace()
                alert('Review berhasil dihapus')
            })
            .catch(err => {
                console.log(err)
            })
        }                
    }


    return (
        <div className="py-3 px-3 my-2 bg-white">
            <small className="font-weight-bold">
                {review.reviewer.displayName} memberi review &thinsp;
                <Link to={`/place/${review.place.placeId}`} className="text-primary">{review.place.name}</Link>
            </small>            
            <div className="d-flex w-100 pt-3">                
                <Avatar width="35" height="35" photoURL={review.reviewer.photoURL} />
                <div className="px-2">
                    <div className="text-primary font-weight-bold">{review.reviewer.displayName}</div>
                    <small className="text-secondary">
                        {toDate(review.created)}
                    </small>
                </div>                                    
                {
                    renderRate ? <Rate value={review.star} /> : null
                }
            </div>
            <p className="pt-2">
                {review.content}
            </p>
            {
                edit ? 
                <div className="d-flex">
                    <UpdateReviewModal forceRenderRate={forceRenderRate} refreshPlace={props.refreshPlace} review={review} place={review.place} />
                     &thinsp;
                    <button className="btn btn-outline-danger btn-sm" onClick={() => deleteReview(review.place, review.reviewId)}>Hapus Review</button> 
                </div>
                : null
            }
        </div>
    )
}

export default ReviewCard