import React, { useState } from 'react'
import "./checkOut.css"
import { useSelector } from 'react-redux';
import { useGetMyOrderQuery } from '../../app/service/orderApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { number } from 'yup';

function CheckOut() {
    const [turn, setTurn] = useState(false);
    const [text, setText] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [transport, setTransport] = useState(true);
    const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
    const { data, isLoading, isError } = useGetMyOrderQuery(auth.email);
    const [address, setAddress] = useState(data?.user.address);
    const natigave = useNavigate();
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    const handlenBtnPaymnet = (event) => {
        const selectedOption = event.target.value;
        setTurn(selectedOption === '2');
    }
    const ship = transport ? 35000 : 50000
    const tax = (data?.totalPrice * 10) / 100;
    const total = ship + data?.totalPrice + tax
    const onSubmit = async (obj) => {
        if (address == "") {
            toast.error("Địa chỉ không được để trống !! ")
            return;
        }
        const objPush1 = {
            userId: data?.user.id,
            orderId: data?.id,
            address: address,
            categoryPayment: 1,
            text: text,
            transport: transport ? parseInt(0) : parseInt(1),
            totalPrice: parseFloat(total),
            nameAccount: obj.name,
            numberAccount: obj.AccountNumber,
            brandBank: obj.bank
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/user/CreatePayment`, objPush1,config);
            toast.success(" Khởi tạo đơn hàng thành công  ! ")
            natigave("/account/thanks")
        } catch (err) {
            console.log(err)
        }
        console.log(objPush1)

    }

    const handlenBtnbuy = async () => {
        if (address == "") {
            toast.error("Địa chỉ không được để trống !! ")
            return;
        }
        const objPush = {
            userId: data?.user.id,
            orderId: data?.id,
            address: address,
            categoryPayment: 0,
            text: text,
            transport: transport ? parseInt(0) : parseInt(1),
            totalPrice: parseFloat(total)
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/user/CreatePayment`, objPush,config);
            toast.success(" Khởi tạo đơn hàng thành công  ! ")
            natigave("/account/thanks")
        } catch (err) {
            console.log(err)
        }
    }
    if (isLoading) {
        return <>
            <div class="">
                <h5 class="card-title text-center">Vui lòng chờ trong giây lát </h5>
                <p class="text-center"> Chúng tôi đang lấy dữ liệu từ kho lưu trữ dữ liệu của chúng tôi ,.... mong bạn thông cảm !!  </p>


                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>


            </div>
        </>
    }

    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />

            <section className="bg-light py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 mb-4">

                            {/* Checkout */}
                            <div className="card shadow-0 border">
                                <div className="p-4">
                                    <h5 className="card-title mb-3">Thông tin đơn hàng </h5>
                                    <div className="row">
                                        <div className="col-6 mb-3">
                                            <p className="mb-0">Họ Tên</p>
                                            <div className="form-outline">
                                                <input type="text" id="typeText" placeholder="Type here" className="form-control" value={data?.user.name} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <p className="mb-0">Số Điện Thoại</p>
                                            <div className="form-outline">
                                                <input type="text" id="typeText" placeholder="Type here" className="form-control" value={data?.user.phone} />
                                            </div>
                                        </div>
                                        <div className="col-6 mb-3">
                                            <p className="mb-0">Địa chỉ</p>
                                            <div className="form-outline">
                                                <input type="tel" id="typePhone" className="form-control" defaultValue={address} onChange={(e) => setAddress(event.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <h5 className="card-title mb-3">Phương Thức Vận Chuyển </h5>
                                    <div className="row mb-3">
                                        <div className="col-lg-4 mb-3">
                                            {/* Default checked radio */}
                                            <div className="form-check h-100 border rounded-3">
                                                <div className="p-3">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked onChange={() => setTransport(true)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        Vận chuyển thường <br />
                                                        <small className="text-muted">thông thường 3 - 4 ngày </small>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mb-3">
                                            {/* Default radio */}
                                            <div className="form-check h-100 border rounded-3">
                                                <div className="p-3">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => setTransport(false)} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault2" >
                                                        Vận chuyển nhanh  <br />
                                                        <small className="text-muted"> thường 1 - 2 ngày</small>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">

                                        <div className="col-sm-4 mb-3">
                                            <p className="mb-0">Phương thức thanh toán</p>
                                            <select className="form-select" onChange={handlenBtnPaymnet}>
                                                <option value={1} > Nhận hàng thanh toán </option>
                                                <option value={2} >Chuyển khoản </option>
                                            </select>


                                        </div>
                                    </div>
                                    {
                                        turn &&
                                        (
                                            <section className="p-4 p-md-5" >
                                                <div className="card-body p-4">
                                                    <div className="text-center mb-4">
                                                        <h3>Thông tin chuyển khoản</h3>
                                                        <h6>Ngân hàng chuyển khoản</h6>
                                                    </div>
                                                    <form method='Post' action onSubmit={handleSubmit(onSubmit)}>
                                                        <p className="fw-bold mb-4 pb-2">Thông tin về thẻ :</p>
                                                        <div className="d-flex flex-row align-items-center mb-4 pb-1">
                                                            <img className="img-fluid" src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
                                                            <div className="flex-fill mx-3">
                                                                <div className="form-outline">

                                                                    <label className="form-label fs-5" htmlFor="formControlLgXc">Ngân hàng : Vietcombank</label>
                                                                    <input type="text" id="formControlLgXc" className="form-control form-control-lg"
                                                                        value="0021 0004 7671 6" />

                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-4 pb-1">
                                                            <img className="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png" />
                                                            <div className="flex-fill mx-3">
                                                                <div className="form-outline">
                                                                    <label className="form-label fs-5" htmlFor="formControlLgXc">Ngân hàng : MBBank</label>
                                                                    <input type="text" id="formControlLgXs" className="form-control form-control-lg" value="3868 2910 2001" />

                                                                </div>
                                                            </div>

                                                        </div>
                                                        <p className="fw-bold mb-4">Thông tin về người chuyển khoản</p>
                                                        <div className="form-outline mb-4">
                                                            <label className="form-label fs-5 ">Chủ tài khoản</label>
                                                            <input type="text" id="formControlLgXsd" className="form-control form-control-lg" placeholder={"Nhập tên chủ tài khoản"}
                                                                {...register("name",
                                                                    {
                                                                        required: true
                                                                    }
                                                                )
                                                                }
                                                            />
                                                            {Object.keys(errors).length !== 0 && (
                                                                <ul>
                                                                    {errors.name?.type === "required" &&
                                                                        <li className='text-danger'>Tên không được để trống</li>
                                                                    }
                                                                </ul>
                                                            )
                                                            }

                                                        </div>

                                                        <div className="form-outline mb-4">
                                                            <div className="form-outline">
                                                                <label className="form-label fs-5" htmlFor="formControlLgXM">Số tài khoản</label>
                                                                <input type="text" id="formControlLgXM" className="form-control form-control-lg"
                                                                    placeholder="Nhập số tài khoản của bạn"
                                                                    {...register("AccountNumber",
                                                                        {
                                                                            required: true,
                                                                            pattern: {
                                                                                value: /\d{8,15}$/
                                                                            }
                                                                        }
                                                                    )
                                                                    }
                                                                />
                                                                {Object.keys(errors).length !== 0 && (
                                                                    <ul>
                                                                        {errors.AccountNumber?.type === "required" &&
                                                                            <li className='text-danger'>Không để trống Số tài khoản</li>
                                                                        }
                                                                        {errors.AccountNumber?.type === "pattern" &&
                                                                            <li className='text-danger'>Số Tài Khoản không hợp lệ</li>
                                                                        }
                                                                    </ul>
                                                                )
                                                                }

                                                            </div>
                                                        </div>

                                                        <div className="col-7">
                                                            <div className="form-outline mb-4">
                                                                <label className="form-label fs-5" htmlFor="formControlLgXM">Ngân hàng</label>
                                                                <input type="text" id="inputPassword5" class="form-control custom-input" aria-describedby="passwordHelpBlock"
                                                                    {...register("bank",
                                                                        {
                                                                            required: true
                                                                        }
                                                                    )
                                                                    } />
                                                                {Object.keys(errors).length !== 0 && (
                                                                    <ul>
                                                                        {errors.bank?.type === "required" &&
                                                                            <li className='text-danger'>Không để trống tên ngân hàng</li>
                                                                        }
                                                                    </ul>
                                                                )
                                                                }
                                                            </div>
                                                        </div>

                                                        <button className="btn btn-success btn-lg btn-block" type='submit'>Xác minh chuyển khoản</button>
                                                    </form>
                                                </div>
                                            </section>
                                        )
                                    }
                                    {/* <section className="p-4 p-md-5" >
                                        <div className="card-body p-4">
                                            <div className="text-center mb-4">
                                                <h3>Thông tin chuyển khoản</h3>
                                                <h6>Ngân hàng chuyển khoản</h6>
                                            </div>
                                            <form action>
                                                <p className="fw-bold mb-4 pb-2">Thông tin về thẻ :</p>
                                                <div className="d-flex flex-row align-items-center mb-4 pb-1">
                                                    <img className="img-fluid" src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
                                                    <div className="flex-fill mx-3">
                                                        <div className="form-outline">

                                                            <label className="form-label fs-5" htmlFor="formControlLgXc">Ngân hàng : Vietcombank</label>
                                                            <input type="text" id="formControlLgXc" className="form-control form-control-lg" defaultValue="0021 0004 7671 6" />

                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4 pb-1">
                                                    <img className="img-fluid" src="https://img.icons8.com/color/48/000000/visa.png" />
                                                    <div className="flex-fill mx-3">
                                                        <div className="form-outline">
                                                            <label className="form-label fs-5" htmlFor="formControlLgXc">Ngân hàng : MBBank</label>
                                                            <input type="text" id="formControlLgXs" className="form-control form-control-lg" defaultValue="3868 2910 2001" />

                                                        </div>
                                                    </div>

                                                </div>
                                                <p className="fw-bold mb-4">Thông tin về thẻ của bạn</p>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label fs-5 ">chủ tài khoản</label>
                                                    <input type="text" id="formControlLgXsd" className="form-control form-control-lg" defaultValue={"Nhập tên chủ tài khoản"} />

                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col-7">
                                                        <div className="form-outline">
                                                            <label className="form-label fs-5" htmlFor="formControlLgXM">số tài Khoản</label>
                                                            <input type="text" id="formControlLgXM" className="form-control form-control-lg" defaultValue="Nhập số tài khoản của bạn" />

                                                        </div>
                                                    </div>

                                                    <div className="col-2">
                                                        <div className="form-outline">
                                                            <label for="inputPassword5" class="form-label fs-8">Chi Nhánh</label>
                                                            <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
                                                               

                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="btn btn-success btn-lg btn-block">Xác minh chuyển khoản</button>
                                            </form>
                                        </div>



                                    </section> */}

                                    <div className="mb-3">
                                        <p className="mb-0">Lời nhắn của bạn </p>
                                        <div className="form-outline">
                                            <textarea className="form-control" id="textAreaExample1" rows={2} value={text} onChange={(e) => setText(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="float-end">
                                        <Link to={`/account/myOrder`} className="btn btn-light border">Quay Lại</Link>
                                        {
                                            !turn && (
                                                <button className="btn btn-success shadow-0 border" onClick={handlenBtnbuy}>Mua Hàng</button>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                            {/* Checkout */}
                        </div>
                        <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
                            <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: '320px' }}>
                                <h6 className="mb-3">Tổng Cộng</h6>
                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Tổng Tiền</p>
                                    <p className="mb-2">
                                        {
                                            parseFloat(data?.totalPrice).toLocaleString('en-US', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                                minimumIntegerDigits: 3,
                                            })
                                        }đ
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Thuế</p>
                                    <p className="mb-2">
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
                                    <p className="mb-2">Phí Vận Chuyển :</p>
                                    <p className="mb-2">
                                        {
                                            parseFloat(ship).toLocaleString('en-US', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                                minimumIntegerDigits: 3,
                                            })
                                        }đ
                                    </p>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Thành Tiền : </p>
                                    <p className="mb-2 fw-bold">
                                        {
                                            parseFloat(total).toLocaleString('en-US', {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                                minimumIntegerDigits: 3,
                                            })
                                        }đ
                                    </p>
                                </div>
                                <hr />
                                <h6 className="text-dark my-4">Các sản phẩm trong đơn hàng</h6>
                                {
                                    data?.orderItems.map((e) => (
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="me-3 position-relative">
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                                                    {e?.nums}
                                                </span>
                                                <img src={e?.product.thumbail} style={{ height: '96px', width: '96x' }} className="img-sm rounded border" />
                                            </div>
                                            <div className="text-center">
                                                <Link href="#" className="nav-link fs-5">
                                                    {e?.product.name}
                                                </Link>
                                                <div className="price text-muted">
                                                    {
                                                        parseFloat(e?.price).toLocaleString('en-US', {
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0,
                                                            minimumIntegerDigits: 3,
                                                        })
                                                    }đ
                                                </div>
                                            </div>

                                        </div>
                                    )

                                    )
                                }




                            </div>
                        </div>
                    </div>
                </div>
            </section>











        </>
    )
}

export default CheckOut