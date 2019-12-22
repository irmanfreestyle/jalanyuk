import React from 'react'
import Line from './Line'
import Card from './Card'

import Slider from "react-slick";

export default function NewDestination(props) {
    
    let {places} = props

    const sliderOptions = {
        dots: false,
        infinite: true,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 1,      
        swipeToSlide: true,
        lazyLoad: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 803,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 630,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,                    
                }
            }
        ]
    }

    return (
        <div>
            <div className="text-primary d-flex align-items-center">
                <i className="material-icons">library_add</i>&thinsp;
                Tempat Liburan Terbaru<br/>                
            </div>            
            <Line width="215px" />
            <br/>
            {
                !places.length ? <h5 className="text-center text-primary">Loading...</h5> :
                <Slider {...sliderOptions}>
                    {
                        places.map(place => {
                            return (
                                <div key={place.placeId} className="px-3 py-3">
                                    <Card place={place} />
                                </div>
                            )
                        })
                    }
                </Slider>
            }
        </div>
    )
}