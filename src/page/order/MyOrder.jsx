import React from 'react'
import "./orderProcessing.css"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { useGetMyBillQuery } from '../../app/service/orderApi';
import { Link } from 'react-router-dom';

function MyOrder() {
    const { auth, isAuthenticated , token } = useSelector((state) => state.auth)
    const {data , isLoading } = useGetMyBillQuery(auth.email);
    const natigave = useNavigate();

    if(isLoading){
        return <h2>Is Loading ...</h2>
    }
    return (
        <>
            <br/>   
            <br/>   
            <br/> 
            <section style={{ backgroundColor: '' }}>
                <div className="container py-5">
                    {
                        data?.map((e)=> (
                            <div className="row justify-content-center mb-3">
                            <div className="col-md-12 col-xl-10">
                                <div className="card shadow-0 border rounded-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                    <Link>
                                                    <img src={e?.thumbail} className="w-100" />
                                                    </Link>
                                             
                                                    <a href="#!">
                                                        <div className="hover-overlay">
                                                            <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} />
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6 col-xl-6">
                                                <Link>Mã đơn hàng : {e?.id} </Link>
            
                                                <p className="text mb-4 mb-md-0">
                                                    Địa chỉ : <span className='text'>{e?.address}</span>
                                                </p>
                                                <br />
    
                                                <p className="text mb-4 mb-md-0">
                                                    Phương thức thanh toán : <span  className='text-danger'>{
                                                        e?.type == 0 ? "Nhận tiền thành toán" : "Chuyển khoản"
                                                    }</span>
                                                </p>
                                                <br />
    
                                                <p className="text mb-4 mb-md-0">
                                                    Note: <span className='text'>{e?.text}</span>
                                                </p>
                                                
                                            </div>
                                            <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                <div className="d-flex flex-row align-items-center mb-1">
                                                    <h4 className="mb-1 me-1">
                                                         {
                                                            parseFloat(e?.price).toLocaleString('en-US', {
                                                                minimumFractionDigits: 0,
                                                                maximumFractionDigits: 0,
                                                                minimumIntegerDigits: 3,
                                                            })
                                                        }đ
                                                     </h4>
                                                
                                                </div>
                                                <h6 className="text-danger">
                                                    Đang chờ xác nhận
                                                </h6>
                                                <h6 className="text-success">{
                                                    e?.transport == 0 ? "Vận chuyển thường" : "Vận chuyển nhanh"
                                                }</h6>
                                                <div className="d-flex flex-column mt-4">         
                                                    <button className="btn btn-success btn-sm" type="button">Đã nhận được hàng</button>
                                                    <br />
                                                    <Link  to={`/account/getBill/${e?.id}`} className="btn btn-primary btn-sm " type="button" style={{ backgroundColor: 'red' }}>Xem chi tiết đơn hàng</Link>
                                                    <button className="btn btn-danger btn-sm mt-2" type="button">
                                                       Hủy đơn hàng
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    
    
                                  
    
                                </div>
                            </div>
                        </div>
                        )

                        )
                    }
                </div>
            </section>
        
        <br/>   

        <br/>   
        <br/>   
        <br/>   
        <br/>   
        <br/>   









        </>
    )
}

export default MyOrder