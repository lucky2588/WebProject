import React from 'react'
import "./productsBuy.css"
import { useParams } from 'react-router'
import { useGetBillbyIdQuery, useGetPaymentQuery } from '../../app/service/orderApi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PaymentDetail() {
    const { paymentId } = useParams();
    const { auth, isAuthenticated } = useSelector((state) => state.auth)
    const { data, isLoading } = useGetPaymentQuery(paymentId);

    const { data: dataProduct } = useGetBillbyIdQuery(data?.orderBill.id)
    if (isLoading) {
        return <h3>Is Loading ..</h3>
    }

    console.log(dataProduct)
    const xShip = data?.transport == 0 ? 35000 : 50000
    const tax = (data?.price - xShip) * (10 / 100)


    return (
        <>
            <div className="card-header px-4 py-5 text-center" >
                <h5 className="text-muted mb-0">Cảm ơn bạn đã đặt hàng , <span style={{ color: 'indigo' }}>{auth.name}</span>!</h5>
            </div>
            <section className="h-100 ">
                <div className="container py-5 h-100">

                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-10 col-xl-8">
                            <div className="card" style={{ borderRadius: '10px' }}>

                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p className="lead fw-normal mb-0" style={{ color: '#a8729a' }}> Thông tin đơn hàng</p>
                                        <p className="small text-muted mb-0">Mã Vận Đơn : {paymentId}</p>
                                    </div>
                                    <div className="card shadow-0 border mb-4">
                                        {dataProduct?.orderItems.map((e) => (
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <img src={e?.product.thumbail} className="img-fluid" alt="Phone" />
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <Link to={`/product/${e?.product.id}`} className="text mb-0">{
                                                            e?.product.name
                                                        }</Link>
                                                    </div>

                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text mb-0 small">Đơn giá
                                                            {e?.product.sales > 0 ? (

                                                                <h6 className="card-text mb-1 me-1 text-danger">{
                                                                    parseFloat(e?.product.sales).toLocaleString('en-US', {
                                                                        minimumFractionDigits: 0,
                                                                        maximumFractionDigits: 0,
                                                                        minimumIntegerDigits: 3,
                                                                    })
                                                                }đ

                                                                    <a class="text-warning text-test"><s>

                                                                    </s></a>
                                                                </h6>

                                                            ) : (
                                                                <h6 className="card-text">
                                                                    {
                                                                        parseFloat(e?.product.price).toLocaleString('en-US', {
                                                                            minimumFractionDigits: 0,
                                                                            maximumFractionDigits: 0,
                                                                            minimumIntegerDigits: 3,
                                                                        })
                                                                    } đ
                                                                </h6>
                                                            )
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">Số Lượng : {e?.nums} </p>


                                                    </div>
                                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                        <p className="text-muted mb-0 small">Thành Tiền
                                                            <h6 className="card-text">
                                                                {
                                                                    parseFloat(e?.price).toLocaleString('en-US', {
                                                                        minimumFractionDigits: 0,
                                                                        maximumFractionDigits: 0,
                                                                        minimumIntegerDigits: 3,
                                                                    })
                                                                } đ
                                                            </h6>
                                                        </p>
                                                    </div>
                                                </div>
                                                <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: 1 }} />
                                            </div>
                                        )
                                        )
                                        }
                                    </div>
                                    <div className="d-flex justify-content-between pt-2">
                                        <p className="fw-bold mb-2">Thông tin thêm</p>
                                    </div>
                                    <div className="d-flex justify-content-between pt-2">
                                        <p className="text mb-2">Phương thức thanh toán : {
                                            data?.type == 0 ? "Nhận hàng trả tiền " : "Chuyển khoản"
                                        }</p>
                                        <p className="text mb-0"><span className="fw-bold me-4">Thuế</span>
                                            {
                                                parseFloat(tax).toLocaleString('en-US', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                    minimumIntegerDigits: 3,
                                                })
                                            }đ


                                        </p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text mb-2">Ngày khởi tạo  : {new Date(...data?.createAt).toLocaleDateString()}</p>


                                        <p className="text mb-2"><span className="fw-bold me-4">Phí Vận Chuyển</span>
                                            {
                                                parseFloat(xShip).toLocaleString('en-US', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                    minimumIntegerDigits: 3,
                                                })
                                            }đ
                                        </p>

                                    </div>
                                    <div className="d-flex justify-content-between mb-5">
                                        <p className="text mb-2 ">Trạng thái đơn hàng :
                                            {
                                                data?.paymentStatus == "INITIAL" && "Khởi tạo"
                                            }
                                            {
                                                data?.paymentStatus == "SUCCESS" && "Giao hàng thành công"
                                            }
                                            {
                                                data?.paymentStatus == "Not_Receive" && "Hoàn trả hàng"
                                            }
                                            {
                                                data?.paymentStatus == "CANCLE" && "Đơn hàng bị hủy"
                                            }
                                            {
                                                data?.paymentStatus == "PROCEED" && "Đang giao"
                                            }
                                        </p>
                                        <p className="text mb-2"><span className="fw-bold me-4">Hình thức vận chuyển </span>
                                            {
                                                data?.transport == 0 ? ("Thường") : ("Nhanh")
                                            }</p>
                                    </div>
                                    {
                                        data?.reasonCancle != null && (
                                            <div className="d-flex justify-content-between mb-5">
                                                <p className="text mb-2 ">Lý do hủy đơn :
                                                </p>
                                            </div>
                                        )
                                    }

                                </div>
                                <div className="card-footer border-0 " style={{ backgroundColor: '#a8729a', }}>
                                    <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"> Tổng Tiền
                                        : <span className="h5 mb-0 ms-2">
                                            {
                                                parseFloat(data?.price).toLocaleString('en-US', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                    minimumIntegerDigits: 3,
                                                })
                                            } đ
                                        </span></h5>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </section>





















        </>
    )
}

export default PaymentDetail