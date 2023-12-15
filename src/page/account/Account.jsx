import React, { useEffect, useState } from 'react'
import "./account.css"
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { MDBFile, MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer, MDBNavbar } from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';
import { useGetUserQuery, useLazyGetUserQuery } from '../../app/service/userApi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setEmail, setName } from '../../app/slice/authSlice';
import { Link } from 'react-router-dom';

function Account() {
    const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data: dataUser, isLoading } = useGetUserQuery(auth.email);
    const { index, setIndex } = useState(0)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [turn, setTurn] = useState(true);
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }
    const onSubmit = async (data) => {
        const objUpdate = {
            name: data.name,
            address: data.address,
            phoneNumber: data.phoneNumber
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/user/updateUser/${dataUser?.id}`, objUpdate, config);
            toast.success("Cập nhật thông tin thành công  ! ")
            dispatch(setName(data.name))
            window.location.reload()
        } catch (err) {
            alert(err);
        }
    }
    const handlenAvtar = async (e) => {
        const file = e.target.files[0];
        const dataPush = new FormData();
        dataPush.append("file", file)
        try {
            const rs = await axios.post(`http://localhost:8888/api/v1/files/${dataUser?.id}`, dataPush, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            })
            toast.success("Cập nhật thành công !! ")
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }
    const handlenBtnPassword = () => {
        navigate("changlePassword")
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
            <MDBNavbar expand='lg' light bgColor='light'>
                <MDBContainer fluid>
                    <MDBBreadcrumb>
                        <MDBBreadcrumbItem>
                            <Link to={"/"}>Trang Chủ</Link>
                        </MDBBreadcrumbItem>

                        <MDBBreadcrumbItem active>
                            <a href='#'>Thông tin cá nhân</a>
                        </MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                </MDBContainer>
            </MDBNavbar>

            <div className="content">
                <br></br>
                <div style={{ width: '100%' }}>
                    <section style={{ backgroundColor: '' }}>
                        <form method='Post' onSubmit={handleSubmit(onSubmit)}>

                            <div style={{ width: '100%' }} className="container py-5">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="card mb-4">
                                            <div className="card-body text-center">
                                                <img src={dataUser?.avatar || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"} alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px' }} />
                                                <h5 className="my-3">{auth?.name}</h5>
                                                
                                                <div className="d-flex justify-content-center mb-2">
                                                    <button type="button" className="btn btn-primary">Cập nhật Ảnh </button>
                                                    <MDBFile onChange={(e) => handlenAvtar(e)} placeholder='Cập nhật ảnh' />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 mb-lg-0">
                                            <div className="card-body p-0">
                                                <ul className="list-group list-group-flush rounded-3">
                                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                        <i className="fas fa-globe fa-lg text-warning" />
                                                        <p className="mb-0">https://mdbootstrap.com</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Họ Tên</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <input className="text-muted mb-0" defaultValue={dataUser?.name}
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
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Email</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <input className="text-muted mb-0" defaultValue={dataUser?.email} disabled
                                                        />


                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Số Điện Thoại</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <input className="text-muted mb-0" defaultValue={dataUser?.phone}
                                                            {...register("phoneNumber",
                                                                {
                                                                    required: true,
                                                                    pattern: {
                                                                        value: /^0\d{9,11}$/
                                                                    }
                                                                }
                                                            )
                                                            }

                                                        />
                                                        {Object.keys(errors).length !== 0 && (
                                                            <ul>
                                                                {errors.phoneNumber?.type === "required" &&
                                                                    <li className='text-danger'>Số điện thoại không được để trống</li>
                                                                }
                                                                {errors.phoneNumber?.type === "pattern" &&
                                                                    <li className='text-danger'>Số điện thoại không hợp lệ</li>
                                                                }
                                                            </ul>
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <p className="mb-0">Địa chỉ</p>
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <input className="text-muted mb-0" defaultValue={dataUser?.address}

                                                            {...register("address", {
                                                                required: true
                                                            }
                                                            )}
                                                        />
                                                        {Object.keys(errors).length !== 0 && (
                                                            <ul>
                                                                {errors.address?.type === "required" &&
                                                                    <li className='text-danger'>Địa chỉ không được để trống</li>
                                                                }
                                                            </ul>
                                                        )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div>
                                                <Link type="button-warning" className="btn btn-warning btn-rounded btn-lg" to={"changlePassword"} >
                                                    Đổi mật khẩu
                                                </Link>



                                                <button type="submit" className="btn btn-primary btn-rounded btn-lg" >
                                                    Cập Nhật Tài Khoản
                                                </button>


                                            </div>
                                            <br />


                                            <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                                <br>
                                                </br>
                                                <div>
                                                    <p className="mb-2 h5">8</p>
                                                    <p className="text-muted mb-0">Wallets Balance</p>
                                                </div>
                                                <div className="px-3">
                                                    <p className="mb-2 h5">12</p>
                                                    <p className="text-muted mb-0">Income amounts</p>
                                                </div>
                                                <div>
                                                    <p className="mb-2 h5">20</p>
                                                    <p className="text-muted mb-0">Total Transactions</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>



                        </form>
                    </section>
                </div>

            </div>










        </>
    )
}

export default Account