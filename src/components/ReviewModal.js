import React, {useState} from 'react'
import Rate from './Rate'
import Place from '../api/Place'
import {useSelector} from 'react-redux'

export default function ReviewModal(props) {
    const styles = {
        modal: {
            display:'block', 
            background:'rgba(0,0,0,0.4)'                        
        }
    }
    const [showModal, setShowModal] = useState(false)
    let [loading, setLoading] = useState(false)
    let [content, setContent] = useState('')
    let [star, setStar] = useState(0)
    let currentUser = useSelector(state => {
        let {uid, displayName, email, photoURL} = state.user || {}
        return {uid, displayName, email, photoURL}
    })

    function checkReviewExist() {
        let status = false
        if(currentUser.uid !== undefined) {
            props.place.reviews.forEach(review => {
                if(review.reviewer.uid === currentUser.uid) {
                    status = true
                }
            })
        }

        return status
    }
    function addReview() {        
        let placeData = Object.assign({}, props.place)        
        let placeId = props.place.placeId        
        let reviewData = {reviewer: JSON.parse(JSON.stringify(currentUser)), content, star, created: Date.now()}        
        let ref = Place.db.collection('places').doc(placeId)

        if(checkReviewExist()) {
            alert('anda sudah pernah mereview tempat ini')            
            return false;
        } else {
            setLoading(true)
            placeData.reviews.push(reviewData)            
        }                

        ref.set(placeData)
        .then(res => {        
            alert('Success review')
            setShowModal(false)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setShowModal(false)
            setLoading(false)
        })
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)} type="button" className="btn mr-2 btn-sm d-flex align-items-center btn-outline-secondary">
                <i className="material-icons">rate_review</i>&thinsp;
                Tulis Review
            </button>

            <div className="modal fade show" tabIndex="-1" role="dialog" style={showModal?styles.modal:{}}>
                <div className="modal-dialog" >
                    <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h5 className="modal-title" id="exampleModalLabel">
                            {props.place.name}
                        </h5>                        
                    </div>
                    <div className="modal-body">
                        <Rate onChange={(e)=>setStar(e)} value={0} />
                        <textarea onChange={(e) => setContent(e.target.value)} placeholder="Bagikan pengalaman Kamu tentang tempat ini" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button onClick={()=>setShowModal(false)} type="button" className="btn text-danger rm-border" data-dismiss="modal">Batal</button>
                        <button disabled={loading} type="button" onClick={addReview} className="btn my-bg btn-dark rm-border">Posting Review</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}