import React, {useState} from 'react'
import AddPhotos from '../components/AddPhotos'
import Place from '../api/Place'

export default function Create() {
    let [name, setName] = useState('')
    let [category, setCategory] = useState('')
    let [address, setAddress] = useState('')
    let [about, setAbout] = useState('')    
    let [images, setImages] = useState([])    
    let [phone, setPhone] = useState('')
    let [web, setWeb] = useState('')

    let [days, setDays] = useState([
        {
            name: 'Minggu',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Senin',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Selasa',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Rabu',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Kamis',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Jumat',
            active: false,
            open: '00:00',
            close: '00:00'
        },
        {
            name: 'Sabtu',
            active: false,
            open: '00:00',
            close: '00:00'
        }
    ])

    function uploadPlace() {
        Place.postPlace({name, category, address, about, images, phone, web, days})
    }

    function updateDays(index, time, condition) {
        let newData = [...days]        
        
        if(condition === 'open') {
            newData[index].open = time
        } else if(condition === 'close') {
            newData[index].close = time
        } else {
            newData[index].active = !newData[index].active
        }
        setDays(newData)
    }

    let openHours = days.map((day, index) => {
        return(
            <div key={index} className="border-bottom pb-2">
                <input onChange={() => updateDays(index)} checked={day.active} type="checkbox" className="custom-control-input " id={`day-${index}`} />
                <label className="custom-control-label text-black" htmlFor={`day-${index}`}>
                    {day.name}
                </label>
                {
                    !day.active ? '' : 
                    <div className="d-flex align-items-center">
                        <div>
                            <input onChange={(e) => updateDays(index, e.target.value, 'open')} type="text" className="form-control" placeholder="00:00" value={day.open}></input>
                            <small className="text-secondary">Jam Buka</small>
                        </div>
                        <div>
                            <input onChange={(e) => updateDays(index, e.target.value, 'close')} type="text" className="form-control" placeholder="00:00" value={day.close}></input>
                            <small className="text-secondary">Jam Tutup</small>
                        </div>
                    </div>
                }
            </div>
        )
    })


    let [showDetailPlace, setShowDetail] = useState(false)
    let detailComponent = !showDetailPlace ?  
        <div>
            <div className="py-2">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" onChange={() => setShowDetail(true)} className="custom-control-input " id="detail-place" />
                    <label className="custom-control-label font-weight-bold" htmlFor="detail-place">Tambahkan jam buka, telepon, situs</label>
                </div>
            </div>            
        </div>
        : 
        <div>
            <div className="py-2">
                <label className="font-weight-bold d-flex align-items-center">                            
                    <i className="material-icons">local_phone</i> &thinsp;
                    No Telepon
                </label>
                <input onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" placeholder="Masukan no telepon" />
            </div>
            <div className="py-2">
                <label className="font-weight-bold d-flex align-items-center">                            
                    <i className="material-icons">web</i> &thinsp;
                    Situs Web
                </label>
                <input onChange={(e) => setWeb(e.target.value)} type="text" className="form-control" placeholder="Masukan situs web tempat" />
            </div>
            <div className="py-2">
                <label className="font-weight-bold d-flex align-items-center">                            
                    <i className="material-icons">access_time</i> &thinsp;
                    Jam Buka
                </label>
                <div className="custom-control custom-checkbox">
                    {openHours}
                </div>
            </div>
        </div>

    return (
        <div>
            <div className="my-bg text-white py-5">
                <div className="container font-weight-bold">
                    Posting Tempat
                    <div>
                        <small>Bagikan tempat wisata, hotel, atau restoran yang kamu tahu</small>
                    </div>
                </div>
            </div>
            <div className="container">                
                <div style={{
                    width:'600px', maxWidth:'100%',margin:'auto', transform:'translateY(-30px)'
                }} className="py-3 px-3 my-box-shadow bg-white text-primary">
                    <div className="py-2">
                        <label className="font-weight-bold d-flex align-items-center">
                            <i className="material-icons">store</i> &thinsp;
                            Nama Tempat
                        </label>
                        <input type="text" className="form-control" placeholder="Masukan nama tempat" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="py-2">
                        <label className="font-weight-bold d-flex align-items-center">
                            <i className="material-icons">apps</i> &thinsp;
                            Kategori
                        </label>
                        <select className="form-control" onChange={(e) => setCategory(e.target.value)} value={category}>
                            <option>Pilih Kategori Tempat</option>
                            <option>Tempat Wisata</option>
                            <option>Restoran</option>
                            <option>Hotel</option>
                        </select>
                    </div>
                    <div className="py-2">
                        <label className="font-weight-bold d-flex align-items-center">                            
                            <i className="material-icons">location_on</i> &thinsp;
                            Alamat Tempat
                        </label>
                        <input onChange={(e) => setAddress(e.target.value)}  type="text" className="form-control" placeholder="Masukan alamat tempat" />
                    </div>
                    <div className="py-2">
                        <label className="font-weight-bold d-flex align-items-center">                            
                            <i className="material-icons">info_outline</i> &thinsp;
                            Tentang Tempat
                        </label>
                        <textarea onChange={(e) => setAbout(e.target.value)} className="form-control" rows="3" placeholder="Tulis deskripsi tempat"></textarea>
                    </div>                    
                    <div className="py-2">
                        <label className="font-weight-bold d-flex align-items-center">                            
                            <i className="material-icons">add_a_photo</i> &thinsp;
                            Tambahkan Foto Tempat
                        </label>
                        <AddPhotos sendToParent={(val) => setImages(val)} />
                    </div>

                    {detailComponent}

                    <hr/>

                    <div className="py-2">
                        <div className="ml-auto d-flex justify-content-end">
                            <button onClick={uploadPlace} className="rounded-lg d-flex align-items-center btn btn-sm my-bg btn-dark rm-border my-box-shadow">                            
                                <i className="material-icons">send</i>&thinsp;
                                Posting Tempat
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}