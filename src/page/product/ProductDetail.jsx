import React from 'react'
import "./productDetail.css"
import { useNavigate, useParams } from 'react-router'
import { productApi, useGetProductByIdQuery, useGetProductSimilarQuery, useLazyGetProductCommentQuery } from '../../app/service/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { set } from 'react-hook-form';
import ReactPaginate from 'react-paginate';
function ProductDetail() {
    const dispatch = useDispatch();
    const [temple, setTemple] = useState("");
    const [nums, setNums] = useState(1);
    const { productID } = useParams();
    const { data: ProductData, isLoading } = useGetProductByIdQuery(productID);
    const [getComments, { data: commentData }] = useLazyGetProductCommentQuery();
    const [status, setStatus] = useState(true);
    const { data: dataProductSimilar, isLoading: isLoadingProductSimilar } = useGetProductSimilarQuery(
        {
            productId: productID,
            brandId: ProductData?.brand.id
        }
    );
    const nativage = useNavigate();
    const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
    const [text, setText] = useState("");
    const [showList, setShowList] = useState(false);
    useEffect(() => {
        getComments(

            {
                page: 0,
                pageSize: 6,
                productId: productID
            }
        );
    }, [ProductData, text])

    const hanldenBtnAddFavorites = async (productId) => {
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
    const handlenBtnCmt = async () => {
        if (!isAuthenticated) {
            alert("Hãy đăng nhập trước khi bình luận") // xử lí chậm in ra alert 
            nativage("/login")
        }
        if (text == "") {
            alert("không để trống bình luận !! ")
            return;
        }
        const commentPush = {
            email: auth.email,
            contentComment: text
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/public/sendCommentProduct/${productID}`, commentPush, config);
            toast.success("Cảm ơn bạn đã bình luận bài viết của chúng tôi")
            setText("")
        } catch (err) {
            alert(err);
        }
    }
    const handlenBtnCancle = () => {
        setText("")
    }
    const handlenBtnDown = () => {
        if (nums == 1) {
            toast.error("Số lượng sản phẩm phải lớn hơn 1 ")
            return;
        }
        setNums(nums - 1)
    }
    const handlenBtnPush = () => {
        console.log(ProductData?.nums)
        if (nums > ProductData?.nums - 1) {
            toast.error("Sản phẩm này không có đủ số lượng bạn mua !! vui lòng điều chỉnh số lượng !!")
            return;
        }
        setNums(nums + 1)
    }

    const handlenBtnAddCart = async (id) => {
        const ObjAddCard = {
            email: auth.email,
            productId: id,
            nums: nums
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const response1 = await axios.post(`http://localhost:8888/api/v1/order/addProductToOrder`, ObjAddCard, config);
            toast.success("Đã thêm Sản phẩm vào giỏ hàng !")
        } catch (err) {
            toast.error("Số lượng sản phẩm tại Cửa hàng không đủ")
        }
    }
    const handlePageClick = (page) => {
        getComments(
            {
                page: page.selected,
                pageSize: 6,
                productId: productID
            }
        );
    }
    const handleClick = () => {
        setShowList(!showList);
    };
    const handlenBtnDelete = async (id) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const response1 = await axios.delete(`http://localhost:8888/api/v1/order/addProductToOrder`, config);
            toast.success("Xóa bình luận thành công  !")
        } catch (err) {
            alert(err)
        }
          
    }

    if (isLoading || isLoadingProductSimilar) {
        return <h2>Is Loading ....</h2>
    }


    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />
            <div>

                <section className="py-5">
                    <div className="container">
                        <div className="row gx-5">
                            <aside className="col-lg-6">


                                <div className="d-flex justify-content-center mb-3">
                                    <Carousel>
                                        <div >

                                            <img style={{ maxWidth: '80%', maxHeight: '60vh', margin: 'auto' }} src={ProductData?.thumbail} />
                                        </div>
                                        <div >
                                            <img style={{ maxWidth: '80%', maxHeight: '60vh', margin: 'auto' }} src={ProductData?.thumbail} />
                                        </div>
                                        <div>
                                            <img style={{ maxWidth: '80%', maxHeight: '60vh', margin: 'auto' }} src={ProductData?.thumbail} />
                                        </div>
                                    </Carousel>
                                </div>
                            </aside>
                            <main className="col-lg-6">
                                {ProductData?.sales > 0 ? (
                                    <div className="d-flex justify-content-between">
                                        <h6><span className="badge bg-danger pt-1 mt-3 ms-2">{(Math.round(10 - ((ProductData?.sales / ProductData?.price) * 10)) * 10)}%</span></h6>
                                    </div>
                                ) : (
                                    <>
                                        <div className="d-flex justify-content-between">
                                            {
                                                ProductData?.view > 3 ? (
                                                    <h6><span className="badge bg-warning pt-1 mt-3 ms-2"></span></h6>
                                                ) : (
                                                    <h6><span className="badge bg-success pt-1 mt-3 ms-2">New Arrival</span></h6>
                                                )
                                            }

                                        </div></>
                                )}
                                <div className="ps-lg-3">
                                    <h4 className="title text-dark">
                                        {ProductData?.name}
                                    </h4>
                                    {/* sao / */}
                                    <div className="d-flex flex-row my-3">
                                        <span className="text-muted"><i className="fas fa-eye fa-sm mx-1" /> {ProductData?.view} lượt xem  </span>
                                        <span className="text-success ms-2">Còn hàng</span>

                                    </div>
                                    <div className="mb-3">
                                        {ProductData?.sales > 0 ? (

                                            <h5 className="card-text mb-1 me-1 text">{
                                                parseFloat(ProductData?.sales).toLocaleString('en-US', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                    minimumIntegerDigits: 3,
                                                })
                                            }đ<span className="text-muted">/sản phẩm</span>

                                                <a class="text-warning text-test text-danger"><s>
                                                    {
                                                        parseFloat(ProductData?.price).toLocaleString('en-US', {
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0,
                                                            minimumIntegerDigits: 3,
                                                        })
                                                    }đ
                                                </s></a>
                                            </h5>

                                        ) : (
                                            <h4 className="card-text">
                                                {
                                                    parseFloat(ProductData?.price).toLocaleString('en-US', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                        minimumIntegerDigits: 3,
                                                    })
                                                } đ
                                                <span className="text-muted">/sản phẩm</span>
                                            </h4>
                                        )
                                        }
                                    </div>
                                    <div className="row">
                                        <dt className="col-3">Số Lượng:</dt>
                                        <dd className="col-9">{ProductData?.nums} sản phẩm</dd>
                                        <dt className="col-3">Số Lượng Bán:</dt>
                                        <dd className="col-9">{ProductData?.numsSold} sản phẩm</dd>
                                        <dt className="col-3">Loại Hàng:</dt>
                                        <dd className="col-9">{ProductData?.category.name}</dd>
                                        <dt className="col-3">Thương Hiệu:</dt>
                                        <dd className="col-9">{ProductData?.brand.name}</dd>
                                    </div>
                                    <hr />
                                    <div className="row mb-4">
                                        {/* col.// */}
                                        <div className="col-md-4 col-6 mb-3">
                                            <label className="mb-2 d-block">Số Lượng</label>
                                            <div className="input-group mb-3" style={{ width: '170px' }}>
                                                <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark" onClick={() => handlenBtnDown()}>
                                                    <i className="fas fa-minus" />
                                                </button>
                                                <input type="te" className="form-control text-center border border-secondary" value={nums} aria-label="Example text with button addon" aria-describedby="button-addon1" min={1} />
                                                <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" onClick={() => handlenBtnPush()} data-mdb-ripple-color="dark">
                                                    <i className="fas fa-plus" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn btn-primary shadow-0" onClick={() => handlenBtnAddCart(ProductData?.id)}> <i className="me-1 fa fa-shopping-basket" /> Thêm vào giỏ hàng</button>
                                    <button onClick={() => hanldenBtnAddFavorites(ProductData?.id)} className="btn btn-light border border-secondary py-2 icon-hover px-3" > <i className="me-1 fa fa-heart fa-lg" /> Yêu Thích </button>
                                </div>
                            </main>
                        </div>
                    </div>
                </section>

                <section className="bg-light border-top py-4">
                    <div className="container">
                        <div className="row gx-4">
                            <div className="col-lg-8 mb-4">
                                <div className="border rounded-2 px-3 py-2 bg-white">

                                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                        <li className="nav-item d-flex" role="presentation">
                                            <button className="nav-link d-flex align-items-center justify-content-center w-100 active" id="ex1-tab-1" data-mdb-toggle="pill" href="#ex1-pills-1" role="tab" aria-controls="ex1-pills-1" aria-selected={status} onClick={() => setStatus(true)}>Giới thiệu Sản Phẩm</button>
                                        </li>
                                        <li className="nav-item d-flex" role="presentation">
                                            <button className="nav-link d-flex align-items-center justify-content-center w-100" id="ex1-tab-2" data-mdb-toggle="pill" href="#ex1-pills-2" role="tab" aria-controls="ex1-pills-2" aria-selected={status} onClick={() => setStatus(false)}>Mô tả chi tiết</button>
                                        </li>
                                    </ul>

                                    <div className="tab-content" id="ex1-content">
                                        {status ? (
                                            <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                                                <p>
                                                    {ProductData?.content}
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <p>
                                                    {ProductData?.description}
                                                </p>
                                            </>
                                        )
                                        }
                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="px-0 border rounded-2 shadow-0">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Các Sản Phẩm tương tự</h5>
                                            {
                                                dataProductSimilar?.map((e) => (
                                                    <div className="d-flex mb-3">
                                                        <Link to={`/product/${e?.id}`} className="me-3">
                                                            <img src={e?.thumbail} style={{ minWidth: '66px', height: '86px' }} className="img-md img-thumbnail" />
                                                            <strong className="text-dark"> {e?.name}</strong>
                                                            <br></br>
                                                        </Link>
                                                    </div>
                                                )
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section style={{ backgroundColor: '' }}>
                    <div className="container  py-5" style={{ width: '5000px' }}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-12 col-lg-12 col-xl-8">
                                <div className="card">
                                    {
                                        commentData?.content.map((comment) => (
                                            <div className="card-body col-12">
                                                <div className="d-flex flex-start align-items-center col-12">
                                                    <img className="rounded-circle shadow-1-strong me-3" src={comment?.user.avatar} alt="avatar" width={60} height={60} />
                                                    <div>
                                                        {
                                                            comment?.user.id == auth?.id && (
                                                                <div className=" btnOption">
                                                                    <button className="icon btn btn-danger" onClick={() => handlenBtnDelete()} href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" />Remove</button>
                                                                </div>
                                                            )
                                                        }

                                                        <h6 className="fw-bold text-primary mb-1">{comment?.user.name}</h6>

                                                        <p className="text-muted small mb-0">
                                                            {new Date(...comment?.createAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="mt-3 mb-4 pb-2">
                                                    {comment?.content}

                                                </p>
                                                <hr class="hr-light" />

                                            </div>

                                        )
                                        )
                                    }
                                    <nav className="my-4" aria-label="...">
                                        <ul className="pagination pagination-circle justify-content-center">

                                            <ReactPaginate
                                                nextLabel="Trang tiếp theo >"
                                                onPageChange={handlePageClick}
                                                pageRangeDisplayed={2}
                                                marginPagesDisplayed={2}
                                                pageCount={commentData?.totalPages}
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
                                    <div className="card-footer py-3 border-0" style={{ backgroundColor: '' }}>
                                        <div className="d-flex flex-start w-100">

                                            <div className="form-outline w-100">
                                                <textarea className="form-control" id="textAreaExample" rows={4} style={{ background: '#fff' }} value={text} onChange={e => setText(e.target.value)} />
                                                <label className="form-label" htmlFor="textAreaExample">Viết bình luận </label>
                                            </div>
                                        </div>
                                        <div className="float-end mt-2 pt-1">
                                            <button type="button" className="btn btn-primary btn-sm" onClick={handlenBtnCmt}>Bình Luận</button>
                                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={handlenBtnCancle}>Hủy</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>



        </>
    )
}

export default ProductDetail