import React from 'react'
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router'
import { useLazyGetProductsQuery } from '../../app/service/productApi';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./homeList.css"
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
function HomeList() {
  const { auth, isAuthenticated , token } = useSelector((state) => state.auth)
  const { content } = useParams();
  const [getProduct, { data: productData, isLoading }] = useLazyGetProductsQuery();
  useEffect(() => {
    getProduct(
      {
        content: content,
        page: 0,
        pageSize: 8,
      }
    );
  }, [])

  if (isLoading) {
    return <h2>... Is Loading</h2>
  }
  const handlePageClick = (page) => {
    getProduct(
      {
        content: content,
        page: page.selected,
        pageSize: 8
      }
    );
  }

  const hanldenBtnAddFavorites = async (productId) => {
    if(!isAuthenticated){
      toast.error("Hãy đăng nhập trước khi sử dụng tính năng này")
    }
    const objPush = {
      productId: productId,
      email: auth.email
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.post(`http://localhost:8888/api/v1/user/addItemFavorites`, objPush,config);
      toast.success("Đã thêm Sản phẩm vào danh sách yêu thich ! ")

    } catch (err) {
      toast.error("Sản phẩm này đã trong danh sách yêu thích của bạn")
    }
  }


  const handlenBtnAddCart = async (id) => {
    if(!isAuthenticated){
      toast.error("Hãy đăng nhập trước khi sử dụng tính năng này")
    }
    const ObjAddCard = {
      email: auth.email,
      productId: id,
      nums: 1
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    try {
      const response1 = await axios.post(`http://localhost:8888/api/v1/order/addProductToOrder`, ObjAddCard,config);
      toast.success("Đã thêm Sản phẩm vào giỏ hàng  ! ")
    } catch (err) {
      toast.error("Số lượng sản phẩm tại Cửa hàng không đủ")
    }
  }



  return (
    <>
      <div>
        {/* Products */}
        <section>
          <div className="container my-5">
            <header className="mb-4">
              <h3>New products</h3>
            </header>
            <div className="row">
              {
                productData?.content.map((product) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                    <div className="card w-100 my-2 shadow-2-strong my-card">
                    {product?.sales > 0 ? (
                        <div className="d-flex justify-content-between">
                          <h6><span className="badge bg-danger pt-1 mt-3 ms-2">{(Math.round(10 - ((product?.sales / product?.price) * 10)) * 10)}%</span></h6>
                        </div>
                      ) : (
                        <>
                          <div className="d-flex justify-content-between">
                            {
                              product?.view > 3 ? (
                                <h6><span className="badge bg-warning pt-1 mt-3 ms-2">{content}</span></h6>
                              ) : (
                                <h6><span className="badge bg-success pt-1 mt-3 ms-2">New Arrival</span></h6>
                              )
                            }
                            {/* <h6><span className="badge bg-warning pt-1 mt-3 ms-2">{content}</span></h6> */}
                          </div></>
                      )}
                      <Link to={`/product/${product?.id}`}>

                        <img src={product?.thumbail} className="card-img-top" style={{ aspectRatio: '1 / 1' }} />
                      </Link>

                      <div className="card-body d-flex flex-column">
                        <Link to={`/product/${product?.id}`} className="card-title">{product?.name}</Link>

                        <div class="d-flex flex-row">
                        {product?.sales > 0 ? (
                          
                          <h6 className="card-text mb-1 me-1 text-danger">{
                            parseFloat(product?.sales).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          }đ
                          
                          <a class="text-warning text-test"><s>
                          {
                            parseFloat(product?.price).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          }đ
                            </s></a>
                          </h6>
                        
                        ) : (
                          <h6 className="card-text">
                            {
                            parseFloat(product?.price).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          } đ
                          </h6>
                        )
                        }

                      

                        </div>
                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                          <button href="#!" className="btn btn-primary shadow-0 me-1" onClick={() => handlenBtnAddCart(product?.id)}>Add to cart</button>
                          <button href="#!" className="btn btn-light border px-2 pt-2 icon-hover" onClick={() => hanldenBtnAddFavorites(product?.id)}><i className="fas fa-heart fa-lg text-secondary px-1" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
                )
              }
            </div>
          </div>
        </section>
        {/* Products */}
        <nav className="my-4" aria-label="...">
          <ul className="pagination pagination-circle justify-content-center">

            <ReactPaginate
              nextLabel="Trang tiếp theo >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={3}
              pageCount={productData?.totalPages}
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
      </div>


    </>
  )
}

export default HomeList