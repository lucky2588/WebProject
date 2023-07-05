import React from 'react'
import { useGetCategoriesQuery } from '../../app/service/categoryApi'
import { Link } from 'react-router-dom';


function CategoryList() {
   const {data , isLoading} = useGetCategoriesQuery();
   if(isLoading) {
    return <h2> Is Loading ... </h2>
   }

    return (
        <>

            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />
            <section style={{ backgroundColor: '' }}>
                <div className="text-center container py-5">
                    <h4 className="mt-4 mb-5"><strong>Danh Mục Sản Phẩm</strong></h4>
                    <div className="row">
                      {
                        data?.map((e)=> (
                            <div className="col-lg-4 col-md-12 mb-4">
                            <div className="card">
                                <Link to={`${e?.id}`}>
                                
                                <div className="bg-image hover-zoom ripple ripple-surface ripple-surface-light" data-mdb-ripple-color="light">
                                 
                                 <img src={e?.thumbail} className="w-50 img-card"   />
                                  
                                    <a href="#!">
                                        <div className="mask">
                                            <div className="d-flex justify-content-start align-items-end h-100">
                                                <h5><span className="badge bg-primary ms-2">New</span></h5>
                                            </div>
                                        </div>
                                        <div className="hover-overlay">
                                            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }} />
                                        </div>
                                    </a>
                                </div>
                                </Link>
                             
                                <div className="card-body">
                                <Link  to={`${e?.id}`} >
                                <a href className="text-reset">
                                        <h5 className="card-title mb-3">{e?.name}</h5>
                                    </a>
                                </Link>
                                    <h6 className="mb-3">{e?.nums} sản phẩm tại  trong cửa hàng</h6>
                                </div>
                            </div>
                        </div>
                        )

                        )
                      }
                    </div> 
                </div>
            </section>















        </>
    )
}

export default CategoryList