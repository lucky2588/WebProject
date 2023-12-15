import React from 'react'
import "./productsBuy.css"
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useLazyGetPaymentsQuery } from '../../app/service/orderApi';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function ListPayment() {
  const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
  const [getData, { data, isLoading }] = useLazyGetPaymentsQuery();
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  useEffect(() => {
    getData(
      {
        page: 0,
        pageSize: 5,
        userId: auth.id
      }
    )
  }, [])

  const handlePageClick = (page) => {
    getData(
      {
        page: 0,
        pageSize: 5,
        userId: auth.id
      }
    )
  }

  if (isLoading) {
    return <h3>is loading ..</h3>
  }
  return (
    <>
      <div className="card-header px-4 py-5 text-center" >
        <h5 className="text-muted mb-0">Cảm ơn bạn đã mua hàng của chúng tôi , <span style={{ color: 'cyan' }}>{auth.name}</span>!</h5>
      </div>
      <section className="h-100 ">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {
              data?.content.length > 0 && data.content.map((e) => (
                <div className="col-lg-10 col-xl-8">
                  <div className="card" style={{ borderRadius: '10px' }}>

                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Link to={`/account/getBill/${e.id}`} className=" btn btn-primary lead fw-normal mb-0" style={{ color: '' }}>Xem chi tiết</Link>
                        {
                          e?.paymentStatus == "SUCCESS" && (
                            <p className="text-success mb-0">Đã Nhận Hàng</p>
                          )
                        }
                         {
                          e?.paymentStatus == "REFUND" && (
                            <p className="text-danger mb-0">Đã Hủy</p>
                          )
                        }
                        {
                          e?.paymentStatus == "CANCLE" && (
                            <p className="text-danger mb-0">Đã Hủy</p>
                          )
                        }
                         {
                          e?.paymentStatus == "Not_Receive" && (
                            <p className="text-danger mb-0">Đã Hủy</p>
                          )
                        }
                      </div>
                      <div className="card shadow-0 border mb-4">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-2">
                              <img src={e.thumbail} className="img-fluid" alt="Phone" />
                            </div>
                            <div className="col-md-5 text-center d-flex justify-content-center align-items-center">
                              <p className="text-muted mb-0 small">Mã ĐH: {e.id}</p>
                            </div>
                            <div className="col-md-4 text-center d-flex  align-items-center">
                              <p className="text-muted mb-0 small"> Address:   {e.address}

                              </p>
                            </div>
                          </div>
                          <hr className="mb-4" style={{ backgroundColor: '#e0e0e0', opacity: 1 }} />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between pt-2">
                        <p className="fw-bold mb-0">Thông tin chung</p>
                        
                      </div>
                      <div className="d-flex justify-content-between pt-2">
                        
                        <p className="text-muted mb-2">Ngày tạo đơn  : 
                        {
                                new Date(...e?.createAt).toLocaleDateString()
                              }
                        </p>
                        <p className="text-muted mb-0"><span className="fw-bold me-4">Phương thức vận chuyển :</span>
                          {
                            e.transport == 0 ? (
                              "Giao hàng thường"
                            ) : (
                              "Giao hàng nhanh"
                            )
                          }
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-2">Ngày giao hàng :

                        {
                             e?.delivery ?   new Date(...e?.delivery).toLocaleDateString() : ("Chưa cập nhật")
                              }
                         </p>
                         <p className="text-muted mb-0">Phương thức thanh toán : <span className=" me-4">
                         {
                          e?.transport == 1 ? (
                            "Nhận hàng thanh toán"
                          ) : (
                            "Chuyển khoản"
                          )
                         }
                         </span> </p>
                       
                      </div>

                      <div className="d-flex justify-content-between mb-5">
                        <p className="text-muted mb-2 ">Ngày nhận: 
                        {
                               e?.delivery ?   new Date(...e?.delivery).toLocaleDateString() : ("Chưa cập nhật")
                              }
                        </p>
                     
                        <p className="text-muted mb-0"><span className="fw-bold me-4">Thuế 10% :</span> 
                        {
                            parseFloat((e.price)*10/100 ).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          }đ
                        
                        </p>
                      </div>
                    </div>
                    <div className=" text-center card-footer border-0 px-4 " style={{ backgroundColor: '#a8729a', borderBottomRightRadius: '10px' }}>
                      <h6 className="d-flex align-items-center text-center justify-content-end text-white text-uppercase mb-0">
                        Tổng tiền :<span className="h6 mb-0 ms-2">
                          {
                            parseFloat(e.price).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          }đ
                        </span></h6>
                    </div>
                  </div>
                </div>
              )

              )
            }




          </div>
        </div>
        <nav className="my-4" aria-label="...">
          <ul className="pagination pagination-circle justify-content-center">

            <ReactPaginate
              nextLabel="Trang tiếp theo >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={3}
              pageCount={data?.totalPages}
              previousLabel="< Trang trước"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </ul>
        </nav>
      </section>








    </>
  )
}

export default ListPayment