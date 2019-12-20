import React from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories'
import reviewImg from '../assets/images/review.svg'
import holidayImg from '../assets/images/holiday.svg'

import NewDestination from '../components/NewDestination'
import PlacesReviewed from '../components/PlacesReviewed'

import MetaTags from 'react-meta-tags'
import Line from '../components/Line'

import isLogin from '../helpers/isLogin'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

export default function Home() {    

    let currentUser = useSelector(state => state.user)

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
                <div className="my-5">
                    <NewDestination />
                    <div className="d-flex justify-content-center">
                        <Link to="/">
                            <button className="rounded-pill btn btn-sm btn-outline-danger">Lihat Selengkapnya</button>
                        </Link>
                    </div>
                </div>
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
                            {
                                isLogin(currentUser) ? null : 
                                <Link to='/auth'>
                                    <button type="button" className="btn bg-white text-primary btn-light w-25 rounded-pill my-box-shadow">Login</button>
                                </Link>
                            }
                        </div>
                        <div className="col-sm-6 d-flex flex-column justify-content-center">
                            <img src={reviewImg} width="300" alt="review-img" />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="my-5">
                <PlacesReviewed />
                <div className="d-flex justify-content-center">
                    <Link>
                        <button className="rounded-pill btn btn-sm btn-outline-danger">Lihat Selengkapnya</button>
                    </Link>
                </div>
            </div>
            

            <div className="my-bg">
                <div className="row align-items-center mx-0 py-3">
                    <div className="col d-flex justify-content-center">
                        <img src={holidayImg} width="350" alt="review-img" />
                    </div>
                    <div className="col">
                        <h4 className="text-white font-weight-bold">Bentar lagi liburan tahun baru nih!</h4>
                        <p className="text-white">
                            Sudah tau mau liburan ke mana? Apa pun itu, <br/> semoga liburanmu menyenangkan dan bermanfaat!
                        </p>
                    </div>
                </div>
            </div>

            <div className="py-4 px-3">
                <div className="container">
                    <h4 className="text-primary font-weight-bold">Tentang Website</h4>
                    <Line width="190px" />
                    <p className="text-secondary mb-0">
                        Website ini adalah tempat untuk mencari informasi destinasi liburan, seperti obyek wisata, hotel, ataupun restoran. <br/>
                        Selain untuk mencari informasi tempat liburan website ini juga mengizinkan user untuk memberikan review dan memposting tempat favoritnya.
                    </p>
                </div>
            </div>

        </div>
    )
}