import React from 'react'
import "./notFound.css"

function NotFound() {
    return (
        <>
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                rel="stylesheet"
            />

            <link
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                rel="stylesheet"
            />

            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css"
                rel="stylesheet"
            />


            <div class="d-flex align-items-center justify-content-center vh-100">
                <div class="text-center">
                    <h1 class="display-1 fw-bold">404</h1>
                    <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
                    <p class="lead">
                        Không tìm thấy đường dẫn của trang này 
                    </p>
                    <a href="index.html" class="btn btn-primary">Trang Chủ</a>
                </div>
            </div>
        </>
    )
}

export default NotFound