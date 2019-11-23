import React from 'react'
import Line from './Line'
import Card from './Card'

export default function NewDestination() {
    return (
        <div className="my-5">
            <div className="text-primary d-flex align-items-center">
                <i className="material-icons">library_add</i>&thinsp;
                Tempat Liburan Terbaru<br/>                
            </div>            
            <Line width="215px" />
            <br/>
            <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-4">
                    <Card src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6AQhst_sHmQbwE3rp3t2tHEgYP9iJFTmq07ZyzCoIMBHVEp4i"/>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                    <Card src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHV9A-tukd4DHubfvQrCjoLaLVwJL09E7uK4NN0r-p8M9HOQd_"/>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-4">
                    <Card src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTAi3yj7QYWJwbiApicS8sl6GUfVPMDsqwrdahR6hMVuixS0jDc"/>
                </div>
            </div>
        </div>
    )
}