import React from 'react'
import "./barCode.css"

function BarCode() {
    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />

            <div id="intro" className="p-5 text-center bg-image shadow-1-strong" style={{ backgroundImage: 'url("https://mdbootstrap.com/img/new/slides/205.jpg")' }}>
                <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white px-4">
                            <h1 className="mb-3">Coming Soon!</h1>

                            <input id="time-counter" className="border border-light my-4 p-4" defaultValue={"BVDDDD"} />
                            <p>We're working hard to finish the development of this site.</p>
                            <p>Until then have a look at our Free Bootstrap 5 tutorials</p>
                            <a className="btn btn-outline-light btn-lg m-2" href="https://www.youtube.com/watch?v=c9B4TPnak1A" role="button" rel="nofollow" target="_blank">Start tutorial</a>
                            <a className="btn btn-outline-light btn-lg m-2" href="https://mdbootstrap.com/docs/standard/" target="_blank" role="button">Download MDB UI KIT</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BarCode