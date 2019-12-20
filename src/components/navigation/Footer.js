import React from 'react'
import Line from '../Line'

export default function Footer() {
    return <>
        <div className="my-bg py-5">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <h5 className="font-weight-bold text-white">Tentang Website</h5>
                        <Line width="140px" color="bg-white" />
                        <p className="text-white">
                            Jalanyuk adalah website untuk mencari informasi tentang tempat-tempat wisata, hotel, dan restoran. 
                        </p>
                    </div>

                    <div className="col-xs-12 col-sm-6">
                        <h5 className="font-weight-bold text-white">Kontak Developer</h5>
                        <Line width="150px" color="bg-white" />
                        <div className="d-flex align-items-center text-white my-2">
                            <i className="material-icons">local_phone</i> &thinsp;
                            <small>    
                                <a className="text-white" href="https://wa.me/62895395924309" target="_blank">
                                    <span>+62895395924309</span>
                                </a>                                                            
                            </small>
                        </div>
                        <div className="d-flex align-items-center text-white my-2">
                            <i className="material-icons">email</i> &thinsp;
                            <small>                                
                                <a className="text-white" href="https://mail.google.com/mail/?view=cm&fs=1&to=irmanfreestyle7@gmail.com" target="_blank">
                                    irmanfreestyle7@gmail.com
                                </a>                                
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}