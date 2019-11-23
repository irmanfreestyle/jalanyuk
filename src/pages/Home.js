import React from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories'
import reviewImg from '../assets/images/review.svg'
import NewDestination from '../components/NewDestination'
import PlacesReviewed from '../components/PlacesReviewed'

export default function Home() {
    return (
        <div>            
            <div className="container">
                <Header />
                <Categories />
                <NewDestination />
            </div>            

            <div className="my-bg">
                <div className="container">
                    <div className="row text-white">
                        <div className="col-sm-6 d-flex flex-column justify-content-center">
                            <p>Ada yang baru nih</p>
                            <h3 className="text-white font-weight-bold">Fitur Review</h3>
                            <p>
                                Sekarang Kamu bisa mereview tempat favorit. <br/>Login dulu ya untuk bisa memberikan ulasan!
                            </p>
                            <button type="button" className="btn bg-white text-primary btn-light w-25 rounded-pill my-box-shadow">Login</button>
                        </div>
                        <div className="col-sm-6 d-flex flex-column justify-content-center">
                            <img src={reviewImg} width="300" alt="review-img" />
                        </div>
                    </div>
                </div>
            </div>
            <PlacesReviewed />
        </div>
    )
}