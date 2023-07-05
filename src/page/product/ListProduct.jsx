import React from 'react'
import "./listProduct.css"
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { set } from 'react-hook-form';
import { useGetBrandForCategoryQuery, useLazyGetProductFilterByCategoryQuery, useLazyGetProductFilterQuery } from '../../app/service/productApi';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useGetCategoriesQuery } from '../../app/service/categoryApi';
import { useGetBrandQuery } from '../../app/service/brandApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function ListProduct() {
  const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
  const { categoryId } = useParams();
  const { data: Categories } = useGetCategoriesQuery();
  const [getProduct, { data: productData, isLoading }] = useLazyGetProductFilterQuery();
  const { data: brandData } = useGetBrandForCategoryQuery(categoryId);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [move,setMove] = useState(0);
  const [minRange, setMinRange] = useState(0);
  const [nav, setNav] = useState(true);
  const [nav2, setNav2] = useState(true);
  const [nav3, setNav3] = useState(true);
  const handlenBtnBuy = () => {
    if (!isAuthenticated) {
      alert("Bạn hãy đăng nhập để mua hàng ")
      return <Navigate to={"/login"} />;
    }
    console.log("todo Buy Product ")
  }
  useEffect(() => {
    getProduct(
      {
        categoryId: categoryId,
        brandId: 200,
        price: 0,
        option : sortBy == null ? 100 : sortBy,
        page: 0,
        pageSize: 5,
      }
    );
  }, [])

 const moveCategory = ()=> {
  getProduct(
    {
      categoryId: categoryId,
      brandId: 200,
      price: 0,
      option : sortBy == null ? 100 : sortBy,
      page: 0,
      pageSize: 5,
    }
  );
 }
  const hanldenBtnAddFavorites = async (productId) => {
    if (!isAuthenticated) {
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
      const response = await axios.post(`http://localhost:8888/api/v1/user/addItemFavorites`, objPush, config);
      toast.success("Đã thêm Sản phẩm vào danh sách yêu thich ! ")

    } catch (err) {
      toast.error("Sản phẩm này đã trong danh sách yêu thích của bạn")
    }
  }
  function setBtnNav() {
    setNav(!nav)
  }
  function setBtnNav2() {
    setNav2(!nav2)
  }
  function setBtnNav3() {
    setNav3(!nav3)
  }
  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption((prevSelectedOption) => {
      // Nếu ô checkbox đã được chọn, hủy chọn nó bằng cách đặt selected Option thành null
      if (prevSelectedOption === value) {
        return null;
      }
      // Ngược lại, chọn ô checkbox mới
      return value;
    });
  }

  const handlePageClick = (page) => {
    if (selectedOption == null) {
      setSelectedOption(100)
    }
    getProduct(
      {
        categoryId: categoryId,
        brandId: selectedOption,
        price: minRange,
        option : sortBy == null ? 100 : sortBy,
        page: page.selected,
        pageSize: 5
      }
    );
  }
  const handlenBtn = () => {
    if (selectedOption == null) {
      setSelectedOption(200)
    }
    getProduct(
      {
        categoryId: categoryId,
        brandId: selectedOption,
        price: minRange,
        option : sortBy == null ? 100 : sortBy,
        page: 0,
        pageSize: 5
      }
    )
  }
  const handlenBtnAddCart = async (id) => {
    if (!isAuthenticated) {
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
      const response1 = await axios.post(`http://localhost:8888/api/v1/user/addProductToOrder`, ObjAddCard, config);
      toast.success("Đã thêm Sản phẩm vào giỏ hàng  ! ")
    } catch (err) {
      toast.error("Số lượng sản phẩm tại Cửa hàng không đủ")
    }
  }
  if (isLoading) {
    return <h2>Is Loading</h2>
  }
  return (
    <>
      <div>
        <div>
          <div className="bg-primary mb-4">
            <div className="container py-4">
              <h3 className="text-white mt-2">Men's wear</h3>
              {/* Breadcrumb */}
              <nav className="d-flex mb-2">
                <h6 className="mb-0">
                  <a href className="text-white-50">Trang Chủ</a>
                  <span className="text-white-50 mx-2"> &gt; </span>
                  <a href className="text-white-50">Danh Mục </a>
                  <span className="text-white-50 mx-2"> &gt; </span>
                  <a href className="text-white"><u>Data</u></a>
                </h6>
              </nav>
              {/* Breadcrumb */}
            </div>
          </div>
          <section className>
            <div className="container">
              <div className="row">
                {/* sidebar */}
                <div className="col-lg-3">
                  {/* Toggle button */}
                  <button className="btn btn-outline-secondary mb-3 w-100 d-lg-none" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent">
                    <span>Show filter</span>
                  </button>
                  {/* Collapsible wrapper */}
                  <div className="collapse card d-lg-block mb-5" id="navbarSupportedContent">
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button className="accordion-button text-dark bg-light" type="button" data-mdb-toggle="collapse" data-mdb-target="#panelsStayOpen-collapseOne" aria-expanded="false"
                            onClick={() => setBtnNav()}
                            aria-controls="panelsStayOpen-collapseOne">
                            Related items
                          </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">

                          {nav && (
                            <>
                              <div className="accordion-body">
                                <ul id="nav-brand" className="list-unstyled" >
                                  {Categories?.map((e)=> (
                                        <li onClick={()=>moveCategory()}><Link to={`/category/${e?.id}`} className="text-dark">{e?.name} </Link></li>
                                  )
                                  )
                                  }
                            
                                </ul>
                              </div>
                            </>
                          )}
                        </div>

                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button className="accordion-button text-dark bg-light" type="button"
                            onClick={() => setBtnNav2()}
                            data-mdb-toggle="collapse" data-mdb-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                            Brands
                          </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo">
                          {
                            nav2 && (
                              <>
                                <div className="accordion-body">
                                  <div>
                                    {/* Checked checkbox */}
                                    {brandData?.map((option) => (
                                      <div className="form-check">
                                        <input className="form-check-input" type="checkbox"
                                          value={option.id}
                                          checked={selectedOption == option.id}
                                          onChange={handleOptionChange}
                                        />
                                        <label className="form-check-label" htmlFor="flexCheckChecked1">{option?.name}</label>
                                        <span className="badge badge-secondary float-end">{option?.nums}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )
                          }
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button onClick={() => setBtnNav3()} className="accordion-button text-dark bg-light" type="button" data-mdb-toggle="collapse" data-mdb-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Price
                          </button>
                        </h2>
                        {nav3 && (
                          <>
                            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree">
                              <div className="accordion-body">
                                <div className="range">
                                  <input type="range" className="form-range"
                                    id="customRange1"
                                    min={0}
                                    step={100000}
                                    max={5000000}
                                    defaultValue={minRange}
                                    onChange={e => setMinRange(e.target.value)} />
                                </div>
                                <div className="row mb-3">
                                  <div className="col-6">
                                    <p className="mb-0">
                                      Min
                                    </p>
                                    {
                                      minRange == 0 ? (
                                        <>
                                          <label className='' >0đ</label>
                                        </>
                                      ) : (
                                        <>
                                          <label className='' >
                                            {
                                              parseFloat(minRange).toLocaleString('en-US', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                                minimumIntegerDigits: 3,
                                              })
                                            } đ
                                          </label>
                                        </>
                                      )
                                    }
                                  </div>
                                  <div className="col-6">
                                    <p className="mb-0 price-max">
                                      Max
                                    </p>
                                    <label className='price-range'>
                                      5.000.000đ
                                    </label>
                                  </div>
                                </div>
                                <button type="button" className="btn btn-white w-100 border border-secondary" onClick={handlenBtn}>Áp dụng</button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* sidebar */}
                {/* content */}
                <div className="col-lg-9">
                  <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                    <strong className="d-block py-2"> Có {productData?.totalElements} trong cửa hàng  </strong>
                    <div className="ms-auto">
                      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="form-select d-inline-block w-auto border pt-1">
                        <option value={null}> Lựa chọn</option>
                        <option value={1}>Lượt Xem Cao </option>
                        <option value={2}>Bán Chạy Nhất</option>
                        <option value={3}>Ngày Ra Mắt</option>
                      </select>
                      <div className="btn-group shadow-0 border">
                        <a href="#" className="btn btn-light" title="List view">
                          <i className="fa fa-bars fa-lg" />
                        </a>
                        <a href="#" className="btn btn-light active" title="Grid view">
                          <i className="fa fa-th fa-lg" />
                        </a>
                      </div>
                    </div>
                  </header>
                  <div className="row justify-content-center mb-3">
                    <div className="col-md-12">
                      {
                        productData?.content.map((e) => (
                          <div className="card shadow-0 border rounded-3">
                            <div className="card-body">
                              <div className="row g-0">
                                <div className="col-xl-3 col-md-4 d-flex justify-content-center">

                                  <Link to={`/product/${e?.id}`}>
                                    <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">

                                      <img src={e?.thumbail} className="w-50" />
                                      <a href="#!">
                                        <div className="hover-overlay">
                                          <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} />
                                        </div>
                                      </a>
                                    </div>
                                  </Link>

                                </div>
                                <div className="col-xl-6 col-md-5 col-sm-7">
                                  <Link to={`/product/${e?.id}`}>
                                    <h5>{e?.name}</h5>
                                  </Link>

                                  <div className="d-flex flex-row">
                                    <span className="text-muted">Còn {e?.nums} sản phẩm tại cửa hàng</span>
                                  </div>
                                  <p className="text mb-4 mb-md-0">
                                    {e?.content}
                                  </p>
                                </div>
                                <div className="col-xl-3 col-md-3 col-sm-5">
                                  <div className="d-flex flex-row align-items-center mb-1">
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
                                    {/* <h4 className="mb-1 me-1">{e?.price}</h4>
                                <span className="text-danger"><s>50,00đ</s></span> */}
                                  </div>
                                  <div className="mt-4">
                                    <button className="btn btn-primary shadow-0" type="button" onClick={() => handlenBtnAddCart(e?.id)} >Add to Cart</button>
                                    <button href="#!" className="btn btn-light border px-2 pt-2 icon-hover" onClick={() => hanldenBtnAddFavorites(e?.id)} ><i className="fas fa-heart fa-lg px-1" /></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                        )
                      }
                    </div>
                  </div>
                  <hr />
                  {/* Pagination */}
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
                  {/* Pagination */}
                </div>
              </div>
            </div>
          </section>



        </div>












      </div>


    </>
  )
}

export default ListProduct