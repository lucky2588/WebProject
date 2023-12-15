import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import "./cf.css"
import useConfirm from '../../hooks/confirmEmail';
import { useConfirmUserQuery } from '../../app/service/authApi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ConfirmAccount() {
    const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const natigave = useNavigate();
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;



    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`http://localhost:8888/auth/confirmToken/${data.data}`);
            toast.success("Xác thực thành công , hãy đăng nhập vào trang của chúng tôi !! ")
            natigave("/login")
        } catch (error) {
            // Xử lý lỗi
            alert(error)
        }
    }
    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="card text-center center" style={{ width: '650px', height: '380px', marginLeft: "35%" }}>
                <div className="card-header h5 text-white bg-primary">Xác Minh Tài Khoản </div>
                <div className="card-body px-5">
                    <p className="card-text py-2">
                        Nhập mã kích hoạt của bạn ở dưới đây để kích hoạt tài khoản
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-outline">
                            <input id="type" className="form-control my-3"
                                {...register("data",
                                    {
                                        required: true
                                    }
                                )
                                }

                            />
                            <label className="form-label" htmlFor="typeEmail">Mã Code </label>
                            {Object.keys(errors).length !== 0 && (
                                <ul>
                                    {errors.data?.type === "required" &&
                                        <li className='text-danger'> Hãy điền mã token của bạn vào đây</li>
                                    }
                                </ul>
                            )
                            }
                            <button className='btn-block btn-link btn-form custom-btn' type='submit'>Xác Nhận</button>
                        </div>
                    </form>

                    <div className="d-flex justify-content-between mt-4">
                        <Link to={"/register"}>Quay Lại </Link>
                        <Link to={"/login"}>Trang Chủ</Link>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />













        </>




    )
}

export default ConfirmAccount