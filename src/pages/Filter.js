import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import Card from '../components/Card'
import Loading from '../components/Loading'

import Firebase from '../api/Place'

export default function Filter(props) {

    let {category} = useParams()
    let history = useHistory()
    let [places, setPlaces] = useState([])
    

    function getPlace(filtering = '') {
        let cat
        console.log(filtering)

        if(filtering.length) {
            cat = filtering === 'tempatwisata' ? 'Tempat Wisata' : filtering === 'hotel' ? 'Hotel' : 'Restoran';
        } else {
            cat = category === 'tempatwisata' ? 'Tempat Wisata' : category === 'hotel' ? 'Hotel' : 'Restoran';
        }
        
        let tmpPlaces = []
        Firebase.db.collection('places').where("category", "==", cat)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {                
                tmpPlaces.push(doc.data())
            });
            setPlaces(tmpPlaces)
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    function filterPage(cat) {
        history.push('/filter/' + cat)
        setPlaces([])
        getPlace(cat)
    }

    useEffect(() => {
        getPlace()
    }, [])

    return (
        <div>
            <div className="my-bg text-white py-5">          
                <div className="container">
                    <h6 className="text-center font-weight-bold text-white">Tempat-tempat berdasakan Kategori</h6>
                </div>
            </div>
            <div className="container">                
                <div style={{width:'600px', maxWidth:'100%',margin:'auto', transform:'translateY(-30px)'}} className="py-3 px-3 my-box-shadow bg-white">
                    <div className="d-flex align-items-center">
                        <b className="text-primary">Kategori</b> &nbsp;
                        <div>
                            <button onClick={() => filterPage('tempatwisata')} className={`my-1 mx-1 btn btn-sm ${category==='tempatwisata'?'my-bg text-white':'btn-outline-secondary'}`}>Obyek Wisata</button>
                            <button onClick={() => filterPage('hotel')} className={`my-1 mx-1 btn btn-sm ${category==='hotel'?'my-bg text-white':'btn-outline-secondary'}`}>Hotel</button>
                            <button onClick={() => filterPage('restoran')} className={`my-1 mx-1 btn btn-sm ${category==='restoran'?'my-bg text-white':'btn-outline-secondary'}`}>Restoran</button>
                        </div>
                    </div>
                </div>

                <div className="row bg-white py-4">
                    {
                        places.length ? null:
                        <div className="spinner-border text-primary" role="status" style={{margin:'auto'}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                    {
                        places.map(place => {
                            return (
                                <div key={place.placeId} className="col-xs-12 col-sm-6 col-md-4">
                                    <Card place={place}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}