import React, {useState} from 'react'
import Rate from './Rate'

export default function ReviewModal() {
    const styles = {
        modal: {
            display:'block', 
            background:'rgba(0,0,0,0.4)'                        
        }
    }
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <button onClick={() => setShowModal(true)} type="button" className="rm-border btn mr-2 btn-sm d-flex align-items-center my-bg btn-dark">
                <i className="material-icons">rate_review</i>&thinsp;
                Tulis Review
            </button>

            <div className="modal fade show" tabIndex="-1" role="dialog" style={showModal?styles.modal:{}}>
                <div className="modal-dialog" role="document" aria-modal="true">
                    <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Candi Borobudur
                        </h5>                        
                    </div>
                    <div className="modal-body">
                        <Rate />
                        <textarea placeholder="Bagikan pengalaman Kamu tentang tempat ini" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div className="modal-footer">
                        <button onClick={()=>setShowModal(false)} type="button" className="btn text-danger rm-border" data-dismiss="modal">Batal</button>
                        <button type="button" className="btn my-bg btn-dark rm-border">Posting Review</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}