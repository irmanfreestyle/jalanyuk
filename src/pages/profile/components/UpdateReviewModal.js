import React, {useState} from 'react'
import Rate from '../../../components/Rate'    
import Place from '../../../api/Place'

import Swal from '../../../helpers/Swal'

function UpdateReviewModal(props) {
    let review = props.review
    let place = Object.assign({}, props.place)

    const [showModal, setShowModal] = useState(false)
    const [star, setStar] = useState(review.star)
    const [content, setContent] = useState(review.content)
    const [loading, setLoading] = useState(false)

    function closeModal() {
        setStar(review.star)
        setContent(review.content)
        setShowModal(false)        
    }

    function updateReview() {       
        
        Swal.confirm({title: 'Ubah review?', icon: 'question', confirmText: 'Ya, ubah'}, nextUpdateReview)

        function nextUpdateReview() {
            place.reviews.forEach((rev, index) => {
                if(rev.reviewId === review.reviewId) {
                    rev.content = content
                    rev.star = star
                }
            }) 
            setLoading(true)
            props.forceRenderRate(false)
            Place.db.collection("places").doc(place.placeId).set(place)
            .then(() => {
                props.refreshPlace()                
                setLoading(false)
                setShowModal(false)
                props.forceRenderRate(true)
                Swal.swalert('Review berhasil diupdate', '', 'success')
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                props.forceRenderRate(true)
            })
        }
    }

    return (
        <div>
            <button className="btn btn-outline-success btn-sm" onClick={()=>setShowModal(true)}>Edit Review</button>
            <div className="modal fade show" tabIndex="-1" role="dialog" style={showModal?
                {
                    display:'block', 
                    background:'rgba(0,0,0,0.4)'                        
                }:{}}
            >
                <div className="modal-dialog" >
                    <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h5 className="modal-title" id="exampleModalLabel">
                            {review.place.name}
                        </h5>                        
                    </div>
                    <div className="modal-body">
                        {
                            loading ? null : <Rate onChange={(e)=>setStar(e)} value={star} />
                        }
                        <textarea onChange={(e) => setContent(e.target.value)} placeholder="Bagikan pengalaman Kamu tentang tempat ini" className="form-control" id="exampleFormControlTextarea1" rows="3" value={content}></textarea>
                    </div>
                    <div className="modal-footer">
                        <button onClick={closeModal} type="button" className="btn text-danger rm-border" data-dismiss="modal">Batal</button>
                        <button disabled={loading} onClick={updateReview} type="button" className="btn my-bg btn-dark rm-border">Edit Review</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateReviewModal