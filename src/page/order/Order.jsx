import React, { useEffect, useRef } from 'react'
import "./order.css"
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGetMyOrderQuery, useGetProductSimilarQuery, useLazyGetMyOrderQuery } from '../../app/service/orderApi';
import { Link } from 'react-router-dom';

function Order() {
    const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
    const [getData, { data, isLoading, isError }] = useLazyGetMyOrderQuery();
    const { data: productSimilar } = useGetProductSimilarQuery(auth.id);
    const navigate = useNavigate();
    useEffect(() => {
        getData(auth.id);
    }, [])
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }
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
            const response = await axios.post(`http://localhost:8888/api/v1//addItemFavorites`, objPush, config);
            toast.success("Đã thêm Sản phẩm vào danh sách yêu thich ! ")

        } catch (err) {
            toast.error("Sản phẩm này đã trong danh sách yêu thích của bạn")
        }
    }

    const handlenBtnAddCart = async (id) => {
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
            const response1 = await axios.post(`http://localhost:8888/api/v1/order/addProductToOrder`, ObjAddCard, config);
            toast.success("Đã thêm Sản phẩm vào giỏ hàng  ! ")
            getData(auth.id)
        } catch (err) {
            toast.error("Số lượng sản phẩm tại Cửa hàng không đủ")
        }
    }
    const removeProductFormCard = async (id) => {
        const ObjRemoveCard = {
            email: auth.email,
            productId: id
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const response1 = await axios.post(`http://localhost:8888/api/v1/order/removeProductFromOrder`, ObjRemoveCard, config);
            toast.success("Đã xóa sản phẩm này khỏi giỏ hàng của bạn !")
            window.location.reload();
        } catch (err) {
            alert(err)
        }
    }

    const handlenBtnDown = async (data) => {
        console.log(data)
        if (data.nums == 1) {
            toast.error("Không thể giảm số lượng sản phẩm nữa")
            return;
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        if (data.nums > data.numsInStore) {
            let objPush = {
                productId: data.ProductId,
                itemId: data.ItemId,
                nums: data.numsInStore,
            }
            try {
                const response1 = await axios.post(`http://localhost:8888/api/v1/order/changleProductFormOrder`, objPush,config);
                toast.success("Các sản phẩm này đã không số lượng , chúng tôi sẽ đặt cho bạn về số lượng sẵn có tại cửa hàng !! ")
            } catch (err) {
                alert(err)
            }
        }
        let objPush = {
            productId: data.ProductId,
            itemId: data.ItemId,
            nums: data.nums - 1,
        }
        try {
            const response2 = await axios.post(`http://localhost:8888/api/v1/order/changleProductFormOrder`, objPush,config);
            getData(auth.id);
        } catch (err) {
            alert(err)
        }
    }

    const handlenBtnPush = async (data) => {
        if (data.nums + 1 > data?.numsInStore) {
            toast.error("Số lượng sản phẩm vượt quá số lượng trong cửa hàng ")
            return;
        }
        if (data.nums > data.numsInStore) {
            let objPush = {
                productId: data.ProductId,
                itemId: data.ItemId,
                nums: data.numsInStore,
            }
            try {
                const response1 = await axios.post(`http://localhost:8888/api/v1/order/changleProductFormOrder`, objPush);
                toast.success("Các sản phẩm này đã không số lượng , chúng tôi sẽ đặt cho bạn về số lượng sẵn có tại cửa hàng !! ")
            } catch (err) {
                alert(err)
            }
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        let objPush = {
            productId: data.ProductId,
            itemId: data.ItemId,
            nums: data.nums + 1,
        }
        try {
            const response2 = await axios.post(`http://localhost:8888/api/v1/order/changleProductFormOrder`, objPush,config);
            getData(auth.id);
        } catch (err) {
            alert(err)
        }
    }

    if (isLoading) {
        return <h2>Is Loading ...</h2>
    }
    const tax = (data?.totalPrice * 10) / 100;

    const totalPrice = data?.totalPrice



    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />

            {isError && (
                <div className="container-fluid  mt-100 ">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">

                                <div className="card-body cart">
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                        <img src="https://i.imgur.com/dCdflKN.png" width={130} height={130} className="img-fluid mb-4 mr-3" />
                                        <h3><strong>Giỏ hàng của bạn đang trống rỗng</strong></h3>
                                        <h4>Hãy quay lại và tìm kiếm thêm sản phẩm mà bạn muốn mua nhé !! </h4>
                                        <Link to={"/"} className="btn btn-primary cart-btn-transform m-3" data-abc="true">Tiếp tục mua sắm</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                
            )
            }
            {
                data?.orderItems.length > 0 && (
                    <div>
                        <section className="bg-light my-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-9">
                                        <div className="card border shadow-0">
                                            <div className="m-4">
                                                <h4 className="card-title mb-4">Các sản phẩm trong giỏ hàng của bạn </h4>
                                                {
                                                    data?.orderItems.map((e) => (
                                                        <div className="row gy-3 mb-4">
                                                            <div className="col-lg-5">
                                                                <div className="me-lg-5">
                                                                    <div className="d-flex">
                                                                        <Link to={`/product/${e?.product.id}`}>
                                                                            <img src={e?.product.thumbail} className="border rounded me-3" style={{ width: '96px', height: '96px' }} />
                                                                        </Link>

                                                                        <div className>
                                                                            <Link to={`/product/${e?.product.id}`} className="nav-link">{e?.product.name}</Link>
                                                                            {e?.product.sales > 0 ? (

                                                                                <small className="card-text mb-1 me-1 text-danger">{
                                                                                    parseFloat(e?.product.sales).toLocaleString('en-US', {
                                                                                        minimumFractionDigits: 0,
                                                                                        maximumFractionDigits: 0,
                                                                                        minimumIntegerDigits: 3,
                                                                                    })
                                                                                }đ/sp

                                                                                    <a class="text-warning text-test"><s>
                                                                                        {
                                                                                            parseFloat(e?.product.price).toLocaleString('en-US', {
                                                                                                minimumFractionDigits: 0,
                                                                                                maximumFractionDigits: 0,
                                                                                                minimumIntegerDigits: 3,
                                                                                            })
                                                                                        }đ
                                                                                    </s></a>
                                                                                </small>

                                                                            ) : (
                                                                                <small className="card-text mb-1 me-1">
                                                                                    {
                                                                                        parseFloat(e?.product.price).toLocaleString('en-US', {
                                                                                            minimumFractionDigits: 0,
                                                                                            maximumFractionDigits: 0,
                                                                                            minimumIntegerDigits: 3,
                                                                                        })
                                                                                    }đ/sp
                                                                                </small>
                                                                            )
                                                                            }
                                                                            <p className="text-muted"> Còn {e?.product.nums} Sản Phẩm </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">

                                                                <div className="row mb-3">

                                                                    <div className="col-md-4 col-6 mb-4 w-50">
                                                                        <label className="mb-2 d-block">Số Lượng</label>
                                                                        <div className="input-group mb-3" style={{ width: '170px' }}>
                                                                            <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark" onClick={() => handlenBtnDown({
                                                                                ItemId: e?.id,
                                                                                ProductId: e?.product.id,
                                                                                nums: e?.nums,
                                                                                numsInStore: e?.product.nums

                                                                            })}>
                                                                                <i className="fas fa-minus" />
                                                                            </button>
                                                                            <input type="text" className="form-control text-center border border-secondary" value={e?.nums}


                                                                                aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                                            <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark"

                                                                                onClick={() => handlenBtnPush({
                                                                                    ItemId: e?.id,
                                                                                    ProductId: e?.product.id,
                                                                                    nums: e?.nums,
                                                                                    numsInStore: e?.product.nums

                                                                                })}
                                                                            >
                                                                                <i className="fas fa-plus" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center text-test">

                                                                    <p>Tổng  : {
                                                                        parseFloat(e?.price).toLocaleString('en-US', {
                                                                            minimumFractionDigits: 0,
                                                                            maximumFractionDigits: 0,
                                                                            minimumIntegerDigits: 3,
                                                                        })  

                                                                    }đ</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                                <div className="float-md-end">
                                                                    <button href="#!" class="btn btn-light border px-2 icon-hover-primary" onClick={() => hanldenBtnAddFavorites(e?.product.id)}><i class="fas fa-heart fa-lg px-1 text-secondary"></i></button>
                                                                    <button href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={()=>removeProductFormCard(e?.product.id)} > Xóa  </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    )
                                                }
                                            </div>
                                            <div className="border-top pt-4 mx-4 mb-4">
                                                <p><i className="fas fa-warning text-muted fa-lg" /> Lưu ý</p>
                                                <p className="text-muted">
                                                    Hãy kiểm tra Sản phẩm kỹ trước khi nhận hàng , trong một số trường hợp mẫu ảnh và sản phẩm thật có độ chênh lệch về thông số cũng như hình ảnh do bên nhà cung cấp có thể đổi mẫu mã , thông số
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="card mb-3 border shadow-0">
                                            <div className="card-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label className="form-label">Áp dụng mã giảm giá</label>
                                                        <div className="input-group">
                                                            <input type="text" className="form-control border" name placeholder="Mã Giảm Giá" />
                                                            <button className="btn btn-light border">Áp Dụng</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="card shadow-0 border">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Tổng </p>
                                                    <p className="mb-2">
                                                        {
                                                            parseFloat(data?.totalPrice).toLocaleString('en-US', {
                                                                minimumFractionDigits: 0,
                                                                maximumFractionDigits: 0,
                                                                minimumIntegerDigits: 3,
                                                            })
                                                        } đ</p>
                                                </div>

                                                {/* <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Thuế:</p>
                                                    <p className="mb-2">
                                                        {
                                                            parseFloat(tax).toLocaleString('en-US', {
                                                                minimumFractionDigits: 0,
                                                                maximumFractionDigits: 0,
                                                                minimumIntegerDigits: 3,
                                                            })
                                                        }đ</p>
                                                </div> */}
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Thành Tiền</p>
                                                    <p className="mb-2 fw-bold">
                                                        {
                                                            parseFloat(totalPrice).toLocaleString('en-US', {
                                                                minimumFractionDigits: 0,
                                                                maximumFractionDigits: 0,
                                                                minimumIntegerDigits: 3,
                                                            })
                                                        }
                                                        đ</p>
                                                </div>
                                                <div className="mt-3">
                                                    <Link to={'/account/checkout'} className="btn btn-success w-100 shadow-0 mb-2"> Chốt đơn hàng </Link>
                                                    <Link to={"/"} className="btn btn-light w-100 border mt-2"> Quay Lại  </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="container my-5">
                                <header className="mb-4">
                                    <h3>Sản phẩm gợi ý</h3>
                                </header>
                                <div className="row">
                                    {
                                        productSimilar?.map((e) => (
                                            <div className="col-lg-3 col-md-6 col-sm-6">
                                                <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                                                    <div className="mask px-2" style={{ height: '50px' }}>
                                                        <div className="d-flex justify-content-between">
                                                            {e?.sales > 0 ? (
                                                                <div className="d-flex justify-content-between">
                                                                    <h6><span className="badge bg-danger pt-1 mt-3 ms-2">{(Math.round(10 - ((e?.sales / e?.price) * 10)) * 10)}%</span></h6>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="d-flex justify-content-between">
                                                                        {
                                                                            e?.view > 3 ? (
                                                                                <h6><span className="badge bg-warning pt-1 mt-3 ms-2"></span></h6>
                                                                            ) : (
                                                                                <h6><span className="badge bg-success pt-1 mt-3 ms-2">New Arrival</span></h6>
                                                                            )
                                                                        }
                                                                        {/* <h6><span className="badge bg-warning pt-1 mt-3 ms-2">{content}</span></h6> */}
                                                                    </div></>
                                                            )}

                                                        </div>
                                                    </div>
                                                    <Link to={`/product/${e?.id}`} className>
                                                        <img src={e?.thumbail} className="card-img-top rounded-2" />
                                                    </Link>
                                                    <div className="card-body d-flex flex-column pt-3 border-top">
                                                        <Link to={`/product/${e?.id}`} className="nav-link">{e?.name}</Link>
                                                        <div className="price-wrap mb-2">
                                                            {e?.sales > 0 ? (

                                                                <small className="card-text mb-1 me-1 text-danger">{
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
                                                                </small>

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

                                                        </div>
                                                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                                            <button href="#" className="btn btn-outline-primary w-100" onClick={() => handlenBtnAddCart(e?.id)}>Thêm giỏ hàng</button >
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

                    </div>
                )
            }

            {/* <div>
               
                <section className="bg-light my-5">
                    <div className="container">
                        <div className="row">
                           
                            <div className="col-lg-9">
                                <div className="card border shadow-0">
                                    <div className="m-4">
                                        <h4 className="card-title mb-4">Các sản phẩm trong giỏ hàng của bạn </h4>
                                        <div className="row gy-3 mb-4">
                                            <div className="col-lg-5">
                                                <div className="me-lg-5">
                                                    <div className="d-flex">
                                                        <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp" className="border rounded me-3" style={{ width: '96px', height: '96px' }} />
                                                        <div className>
                                                            <a href="#" className="nav-link">Winter jacket for men and lady</a>
                                                            <p className="text-muted">Yellow, Jeans</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                      
                                                <div className="row mb-3">
                                               
                                                    <div className="col-md-4 col-6 mb-4 w-50">
                                                        <label className="mb-2 d-block">Số Lượng</label>
                                                        <div className="input-group mb-3" style={{ width: '170px' }}>
                                                            <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                                                                <i className="fas fa-minus" />
                                                            </button>
                                                            <input type="text" className="form-control text-center border border-secondary" defaultValue={1} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                            <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                                                                <i className="fas fa-plus" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                
                                                    <small className="text-center"> $460.00 / per item </small>
                                                </div>
                                            </div>
                                            <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                                <div className="float-md-end">
                                                <button href="#!" class="btn btn-light border px-2 icon-hover-primary"><i class="fas fa-heart fa-lg px-1 text-secondary"></i></button>
                                                    <a href="#" className="btn btn-light border text-danger icon-hover-danger"> Xóa </a>
                                                </div>
                                            </div>
                                        </div>

                                        

                                        




                                    </div>
                                    <div className="border-top pt-4 mx-4 mb-4">
                                        <p><i className="fas fa-truck text-muted fa-lg" /> Thời gian vận chuyển</p>
                                        <p className="text-muted">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip
                                        </p>
                                    </div>
                                </div>



                                
                            </div>
                          
                            <div className="col-lg-3">
                                <div className="card mb-3 border shadow-0">
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label className="form-label">Áp dụng mã giảm giá</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control border" name placeholder="Mã Giảm Giá" />
                                                    <button className="btn btn-light border">Áp Dụng</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card shadow-0 border">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Tổng </p>
                                            <p className="mb-2">$329.00</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Giảm giá:</p>
                                            <p className="mb-2 text-success">-$60.00</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Thuế:</p>
                                            <p className="mb-2">$14.00</p>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Tổng Giá Tiền</p>
                                            <p className="mb-2 fw-bold">$283.00</p>
                                        </div>
                                        <div className="mt-3">
                                            <a href="#" className="btn btn-success w-100 shadow-0 mb-2"> Chốt đơn hàng </a>
                                            <a href="#" className="btn btn-light w-100 border mt-2"> Quay Lại  </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         
                        </div>
                    </div>
                </section>
              
                <section>
                    <div className="container my-5">
                        <header className="mb-4">
                            <h3>Sản phẩm gợi ý</h3>
                        </header>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                                    <div className="mask px-2" style={{ height: '50px' }}>
                                        <div className="d-flex justify-content-between">
                                            <h6><span className="badge bg-danger pt-1 mt-3 ms-2">New</span></h6>
                                            <a href="#"><i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" /></a>
                                        </div>
                                    </div>
                                    <a href="#" className>
                                        <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp" className="card-img-top rounded-2" />
                                    </a>
                                    <div className="card-body d-flex flex-column pt-3 border-top">
                                        <a href="#" className="nav-link">Gaming Headset with Mic</a>
                                        <div className="price-wrap mb-2">
                                            <strong className>$18.95</strong>
                                            <del className>$24.99</del>
                                        </div>
                                        <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                            <a href="#" className="btn btn-outline-primary w-100">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                
            </div> */}

        </>
    )
}

export default Order