import React from 'react'
import Slider from 'react-slick'
import MetaTags from 'react-meta-tags'
import Avatar from '../components/Avatar'

export default function Detail(props) {

    const sliderOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slideToScroll: 1,        
    }

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
                    <div className="col-sm-12 col-md-8 px-0">
                        <div className="bg-white py-2 mb-2 px-3">
                            <div className="mb-2">
                                <h3 className="font-weight-bold mb-0">Bukit Pelangi</h3>
                                <div className="d-flex align-items-center text-primary">
                                    <i className="material-icons">location_on</i>
                                    <span>Bogor Utara</span> 
                                </div>
                            </div>
                            
                            <img width="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMBND6gIn2ktgdUmzhpiyCt22agGF9xglFAM8HwWexODJ2m4bD" className="img-fluid" alt="place image0"/>

                            <div style={{width:'350px'}} className="pt-2">
                                <Slider {...sliderOptions}>                                
                                    <div className="pr-1">
                                        <img width="100%" style={{border: '2px solid #ff5252'}} height="70" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBin7pm4Hivv_Gj5NHhm50R2xxj20qtFjDzJWb9oDfXY9WuBAW"  alt="place image1" />
                                    </div>
                                    <div className="pr-1">
                                        <img width="100%" height="70" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1xu9Wfnq3sfo7z312lbryf3IFb00kZBq_oZmPvUHMGdMk2gMo"  alt="place image2" />
                                    </div>
                                    <div className="pr-1">
                                        <img width="100%" height="70" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSMBND6gIn2ktgdUmzhpiyCt22agGF9xglFAM8HwWexODJ2m4bD"  alt="place image3" />
                                    </div>
                                </Slider>
                            </div>    

                            <div className="my-2 d-flex align-items-center">
                                <button type="button" className="btn mr-2 btn-sm d-flex align-items-center my-bg btn-dark">
                                    <i className="material-icons">rate_review</i>&thinsp;
                                    Tulis Review
                                </button>
                                <button type="button" className="btn mr-2 btn-sm d-flex align-items-center btn-outline-success">
                                    <i className="material-icons">bookmark_border</i>&thinsp;
                                    Simpan Tempat
                                </button>
                            </div>
                        </div>  

                        <div className="px-3 py-2 mb-2 bg-white">
                            <div className="font-weight-bold text-primary d-flex align-items-center">
                                <i className="material-icons">info_outline</i>&thinsp;
                                Tentang Tempat
                            </div>
                            <p className="text-secondary pt-2">
                                Museum cinta Tekstil menempati gedung tua di Jalan K.S. Tubun / Petamburan No. 4 Tanah Abang, Jakarta Barat Gedungnya sendiri pada mulanya adalah rumah pribadi seorang warga negara Perancis yang dibangun pada abad ke-19.
                            </p>
                        </div>

                        <div className="px-3 py-2 mb-2 bg-white">
                            <div className="font-weight-bold text-primary d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <i className="material-icons">rate_review</i>&thinsp;
                                    Review
                                </div>
                                <div>
                                    <button type="button" className="btn btn-sm mr-2 btn-sm d-flex align-items-center my-bg btn-dark">
                                        <i className="material-icons">rate_review</i>&thinsp;
                                        Tulis Review
                                    </button>
                                </div>
                            </div>
                            
                            <div className="py-3 px-3 my-3" style={{background:'#F7F7F7'}}>
                                <div className="d-flex w-100">
                                    <Avatar />
                                    <div className="px-2">
                                        <div className="text-primary font-weight-bold">Irman Utamara</div>
                                        <small className="text-secondary">19/08/2019</small>
                                    </div>                                    
                                    <div className="text-warning">
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star</i>
                                    </div>
                                </div>
                                <p className="pt-2">
                                    Tempatnya keren, rame banget kalo minggu. Rekomended bangetbuat jalan-jalan 
                                    saat liburan gini.
                                </p>
                            </div>
                            <div className="py-3 px-3 my-3" style={{background:'#F7F7F7'}}>
                                <div className="d-flex w-100">
                                    <Avatar />
                                    <div className="px-2">
                                        <div className="text-primary font-weight-bold">Irman Utamara</div>
                                        <small className="text-secondary">19/08/2019</small>
                                    </div>                                    
                                    <div className="text-warning">
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star</i>
                                        <i className="material-icons">star</i>
                                    </div>
                                </div>
                                <p className="pt-2">
                                    Tempatnya keren, rame banget kalo minggu. Rekomended bangetbuat jalan-jalan 
                                    saat liburan gini.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-sm-12 col-md-4">
                        <div className="bg-white mb-1 py-2 px-2 text-secondary d-flex align-items-center">
                            Diupload oleh &thinsp;
                            <span className="text-primary">@irmanfreestyle</span>
                        </div>

                        <div className="bg-white mb-1 px-2 py-2" style={{position: 'sticky', top: '75px'}}>
                            <span className="font-weight-bold">Info tempat</span>
                            <div className="d-flex py-2 text-primary">
                                <i className="material-icons">location_on</i>&thinsp;
                                <div>
                                    <div>Lokasi Tempat</div>
                                    <small className="text-secondary">
                                        Bogor Utara
                                    </small>
                                </div>
                            </div>

                            <div className="d-flex py-2 text-primary">
                                <i className="material-icons">av_timer</i> &thinsp;
                                <div>
                                    <div>Jam Buka</div>
                                    <small className="text-secondary">
                                        Senin  10:00 - 18:00                                        
                                    </small> <br/>
                                    <small className="text-secondary">
                                        Senin  10:00 - 18:00                                        
                                    </small> <br/>
                                </div>
                            </div>

                            <div className="d-flex py-2 text-primary">
                                <i className="material-icons">local_phone</i>&thinsp;
                                <div>
                                    <div>Nomor Telepon</div>
                                    <small className="text-secondary">
                                        +62898398989
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}