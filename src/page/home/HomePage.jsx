import React from 'react'
import { useGetBlogViewQuery } from '../../app/service/blogApi'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import "./home.css"
import { useGetTopProductBestSellerQuery, useGetTopProductViewQuery } from '../../app/service/productApi';
import { useGetBrandQuery } from '../../app/service/brandApi';
import axios from 'axios';
import { useSelector } from 'react-redux';

function HomePage() {
  const { data: blogData, isLoading } = useGetBlogViewQuery();
  const { data: ProductBestSeller } = useGetTopProductBestSellerQuery();
  const { data: ProductBestView } = useGetTopProductViewQuery();
  const { data: brandData } = useGetBrandQuery();
  const { auth, isAuthenticated , token } = useSelector((state) => state.auth)

  const hanldenBtnAddFavorites = async (productId) => {
    if(!isAuthenticated){
      toast.error("Hãy đăng nhập trước khi sử dụng tính năng này")
      return;
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
      return;
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
      const response1 = await axios.post(`http://localhost:8888/api/v1/user/addProductToOrder`, ObjAddCard,config);
      toast.success("Đã thêm Sản phẩm vào giỏ hàng  ! ")
    } catch (err) {
      toast.error("Số lượng sản phẩm tại Cửa hàng không đủ")
    }
  }

  if (isLoading) {
    return <h2> Is Loading ... </h2>
  }
  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />
      <div>
        <section className="pt-3">
          <div className="container">
            <div className="row gx-3">
              <main className="col-lg-9">
                <div className="card-banner p-5 bg-primary rounded-5 " style={{ height: '250px' }}>
                  <div style={{ maxWidth: '500px' }}>
                    <h2 className="text-white">
                     Các dòng sản phẩm mới nhất
                    </h2>
                    <p className="text-white">Khám phá các  sản phẩm với công nghệ mới nhất  </p>
                    <Link to={`list/newArrival`} className="btn btn-light shadow-0 text-primary"> Tìm hiểu thêm </Link>
                  </div>
                </div>
              </main>
              <aside className="col-lg-3">
                <div className="card-banner h-100 rounded-5" style={{ backgroundColor: '#f87217' }}>
                  <div className="card-body text-center pb-5">
                    <h5 className="pt-5 text-white">Chương trình khuyến mãi</h5>
                    <p className="text-white">Deal hời , giá tốt</p>
                    <Link to={`list/ProductSales`} className="btn btn-light shadow-0 text-primary"> Xem thêm </Link>
                  </div>
                </div>
              </aside>
            </div>

          </div>

        </section>

        <br></br>



        <section style={{ backgroundColor: '#' }}>
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-3 col-md-10 mb-5">
                <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                  <img src="https://1000logos.net/wp-content/uploads/2020/09/Corsair-Logo-1994.jpg" className="w-100 img-title" />
                  <a href="#!">
                    <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>

                    </div>
                    <div className="hover-overlay">
                      <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} />
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-10 mb-5">
                <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                  <img src="https://cdn.mos.cms.futurecdn.net/kYaFd35YPJxCk5hpqZ3924.jpg" className="w-100 img-title" />
                  <a href="#!">
                    <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>

                    </div>
                    <div className="hover-overlay">
                      <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} />
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-10 mb-5">
                <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/906779874159274506/5031688EA5EEBAFA252A1F44F772710D275A5A9E/?imw=1024&imh=640&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" className="w-100 img-title" />
                  <a href="#!">
                    <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>

                    </div>
                    <div className="hover-overlay">
                      <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} />
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-10 mb-5">
                <div className="bg-image hover-zoom ripple shadow-1-strong rounded">
                  <img src="https://img.ws.mms.shopee.vn/97c06c230a3f4c81ff5d379d27c9ddf8" className="w-100 img-title" />
                  <a href="#!">
                    <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>

                    </div>
                    <div className="hover-overlay">
                      <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} />
                    </div>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>
        {/* category */}
        {/* Products */}
        <section>
          <div className="container">
            <div className="card p-4 bg-primary">
              <div className="row align-items-center">
                <div className="col">
                  <h4 className="mb-0 text-white">Sản phẩm bán chạy </h4>
                  <p className="mb-0 text-white-50">Dưới đây là các  dòng Sản Phẩm bán chạy của chúng tôi  </p>
                </div>
                <div className="col-auto"><Link className="btn btn-white text-primary shadow-0" to={"list/bestSeller"} >Xem tất cả</Link></div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container my-5">
            <div className="row">
              {
                ProductBestSeller?.map((e) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                    <div className="card w-100 my-2 shadow-2-strong">
                      {e?.sales > 0 ? (
                        <div className="d-flex justify-content-between">
                          <h6><span className="badge bg-danger pt-1 mt-3 ms-2">{(Math.round(10 - ((e?.sales / e?.price) * 10)) * 10)}%</span></h6>

                        </div>
                      ) : (
                        <>
                          <div className="d-flex justify-content-between">
                            <h6><span className="badge bg-success pt-1 mt-3 ms-2">Best Seller</span></h6>

                          </div></>
                      )}

                      <Link to={`product/${e?.id}`}>
                        <img src={e?.thumbail} className="card-img-top" style={{ aspectRatio: '1 / 1' }} />
                      </Link>
                      <div className="card-body d-flex flex-column">
                        <Link to={`product/${e?.id}`}>
                          <h5 className="card-title">{e?.name}</h5>
                        </Link>
                        {e?.sales > 0 ? (
                          
                          <h6 className="card-text mb-1 me-1 text-danger">{
                            parseFloat(e?.sales).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          }đ
                          
                          <a class="text-warning text-test"><s>
                          {
                            parseFloat(e?.price).toLocaleString('en-US', {
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
                            parseFloat(e?.price).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          } đ
                          </h6>
                        )
                        }
                        {/* <p className="card-text">{e?.price}</p> */}
                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                          <button href="#!" className="btn btn-primary shadow-0 me-1" onClick={() => handlenBtnAddCart(e?.id)}>Add to Cart</button>
                          <button href="#!" className="btn btn-light border px-2 pt-2 icon-hover" onClick={() => hanldenBtnAddFavorites(e?.id)} ><i className="fas fa-heart fa-lg text-secondary px-1" /></button>
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
        {/* Features */}
        <section>
          <div className="container">
            <div className="card p-4 bg-primary">
              <div className="row align-items-center">
                <div className="col">
                  <h4 className="mb-0 text-white">Quan tâm nhiều nhất</h4>
                  <p className="mb-0 text-white-50">Dưới đây là các dòng sản phẩm được có lượt xem cao nhất</p>
                </div>
                <div className="col-auto"><Link className="btn btn-white text-primary shadow-0" to={"list/viewTop"}>Xem tất cả</Link></div>
              </div>
            </div>
          </div>
        </section>
        {/* Features */}
        {/* Recommended */}
        <section>
          <div className="container my-5">
            <div className="row">
              {
                ProductBestView?.map((e) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
                    <div className="card w-100 my-2 shadow-2-strong">
                      {e?.sales > 0 ? (
                        <div className="d-flex justify-content-between">
                          <h6><span className="badge bg-danger pt-1 mt-3 ms-2">{(Math.round(10 - ((e?.sales / e?.price) * 10)) * 10)}%</span></h6>

                        </div>
                      ) : (
                        <>
                          <div className="d-flex justify-content-between">
                            <h6><span className="badge bg-warning pt-1 mt-3 ms-2">Top View</span></h6>

                          </div></>
                      )}
                      <Link to={`product/${e?.id}`}>
                        <img src={e?.thumbail} className="card-img-top" style={{ aspectRatio: '1 / 1' }} />
                      </Link>
                      <div className="card-body d-flex flex-column">
                        <Link to={`product/${e?.id}`}>
                          <h5 className="card-title">{e?.name}</h5>
                        </Link>
                        {e?.sales > 0 ? (
                          
                          <h6 className="card-text mb-1 me-1 text-danger">{
                            parseFloat(e?.sales).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          }đ
                          
                          <a class="text-warning text-test"><s>
                          {
                            parseFloat(e?.price).toLocaleString('en-US', {
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
                            parseFloat(e?.price).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          } đ
                          </h6>
                        )
                        }
                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                          <button className="btn btn-primary shadow-0 me-1" onClick={()=>handlenBtnAddCart(e?.id)}>Add to cart</button>
                          <button className="btn btn-light border px-2 pt-2 icon-hover" onClick={() => hanldenBtnAddFavorites(e?.id)}><i className="fas fa-heart fa-lg text-secondary px-1" /></button>
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
        {/* Recommended */}
        <section className="mt-5" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="container text-dark pt-3">
            <header className="pt-4 pb-3">
              <h3>Why choose us</h3>
            </header>
            <div className="row mb-4">
              <div className="col-lg-4 col-md-6">
                <figure className="d-flex align-items-center mb-4">
                  <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                    <i className="fas fa-camera-retro fa-2x fa-fw text-primary floating" />
                  </span>
                  <figcaption className="info">
                    <h6 className="title">Reasonable prices</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                  </figcaption>
                </figure>
                {/* itemside // */}
              </div>
              {/* col // */}
              <div className="col-lg-4 col-md-6">
                <figure className="d-flex align-items-center mb-4">
                  <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                    <i className="fas fa-star fa-2x fa-fw text-primary floating" />
                  </span>
                  <figcaption className="info">
                    <h6 className="title">Best quality</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                  </figcaption>
                </figure>
                {/* itemside // */}
              </div>
              {/* col // */}
              <div className="col-lg-4 col-md-6">
                <figure className="d-flex align-items-center mb-4">
                  <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                    <i className="fas fa-plane fa-2x fa-fw text-primary floating" />
                  </span>
                  <figcaption className="info">
                    <h6 className="title">Worldwide shipping</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                  </figcaption>
                </figure>
                {/* itemside // */}
              </div>
              {/* col // */}
              <div className="col-lg-4 col-md-6">
                <figure className="d-flex align-items-center mb-4">
                  <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                    <i className="fas fa-users fa-2x fa-fw text-primary floating" />
                  </span>
                  <figcaption className="info">
                    <h6 className="title">Customer satisfaction</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                  </figcaption>
                </figure>
                {/* itemside // */}
              </div>
              {/* col // */}
              <div className="col-lg-4 col-md-6">
                <figure className="d-flex align-items-center mb-4">
                  <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                    <i className="fas fa-thumbs-up fa-2x fa-fw text-primary floating" />
                  </span>
                  <figcaption className="info">
                    <h6 className="title">Happy customers</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                  </figcaption>
                </figure>
                {/* itemside // */}
              </div>
              {/* col // */}
              <div className="col-lg-4 col-md-6">
                <figure className="d-flex align-items-center mb-4">
                  <span className="rounded-circle bg-white p-3 d-flex me-2 mb-2">
                    <i className="fas fa-box fa-2x fa-fw text-primary floating" />
                  </span>
                  <figcaption className="info">
                    <h6 className="title">Thousand items</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmor</p>
                  </figcaption>
                </figure>
                {/* itemside // */}
              </div>
              {/* col // */}
            </div>
          </div>
          {/* container end.// */}
        </section>
        {/* Feature */}
        {/* Blog */}
        <section className="mt-5 mb-4">
          <div className="container text-dark">
            <header className="mb-4">
              <h3>Các bài viết liên quan <span className='link-blog'> <Link to={"/listBlog"}> tham khảo thêm </Link></span></h3>
            </header>
            <div className="row">
              {blogData?.map((blog) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <article>
                    <Link to={`blog/${blog.id}`} className="img-fluid">
                      <img className="rounded w-100" src={blog.thumbail} style={{ objectFit: 'cover' }} height={160} />
                    </Link>
                    <div className="mt-2 text-muted small d-block mb-1">
                      <span>
                        <i className="fa fa-calendar-alt fa-sm" />
                        {new Date(...blog.createAt).toLocaleDateString()}
                      </span>
                      <Link to={`blog/${blog.id}`}><h6 className="text-dark">{blog.title} </h6></Link>
                      <p>{blog.content} </p>
                    </div>
                  </article>
                </div>
              )
              )
              }

            </div>
          </div>
        </section>
        {/* Blog */}
      </div>
















    </>
  )
}

export default HomePage