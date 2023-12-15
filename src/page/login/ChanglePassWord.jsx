
import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useConfirm from '../../hooks/confirmEmail';
import { useConfirmUserQuery } from '../../app/service/authApi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

function ChanglePassWord() {
    const { auth, isAuthenticated , token } = useSelector((state) => state.auth)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const natigave = useNavigate();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;




    const onSubmit = async (data) => {

          const objPush = {
            email : auth.email,
            passwordNew : data.passwordNew,
            passwordOld : data.passwordOld
          }

       
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/user/changePassword`, objPush);
            toast.success("Đổi mật khẩu thành công !!!  ")
          } catch (err) {
            toast.error(err.message);
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
                <div className="card-header h5 text-white bg-primary">Đổi Mật Khẩu </div>
                <div className="card-body px-5">
                    <p className="card-text py-2">
                        Nhập mật khẩu cũ và mật khẩu mới để xác minh và đổi mật khẩu 
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="form-outline">
                            <input  type="password" id="type" className="form-control my-3"
                                {...register("passwordOld",
                                    {
                                        required: true
                                    }
                                )
                                }
                            />
                            <label className="form-label" htmlFor="typeEmail">Mật Khẩu Cũ </label>
                            {Object.keys(errors).length !== 0 && (
                                <ul>
                                    {errors.passwordOld?.type === "required" &&
                                        <li className='text-danger'> Mật khẩu không được để trống </li>
                                    }
                                    {errors.passwordOld?.type === "minLength" &&
                                        <li className='text-danger'> Mật khẩu ít nhất 6 ký tự </li>
                                    }
                                </ul>
                            )
                            }
                        </div>
                        <hr></hr>
                        <div className="form-outline">
                            <input type='password' id="type" className="form-control my-3"
                                {...register("passwordNew",
                                    {
                                        required: true,
                                        minLength: 6
                                    }
                                )
                                }

                            />
                            <label className="form-label" htmlFor="typeEmail">Mật Khẩu Mới </label>
                            {Object.keys(errors).length !== 0 && (
                                <ul>
                                    {errors.passwordNew?.type === "required" &&
                                        <li className='text-danger'> Mật khẩu không được để trống </li>
                                    }
                                    {errors.passwordNew?.type === "minLength" &&
                                        <li className='text-danger'> Mật khẩu ít nhất 6 ký tự </li>
                                    }
                                </ul>
                            )
                            }
                        </div>

                        <button className='btn-block btn-link btn-form custom-btn' type='submit'>Đổi mật khẩu </button>

                    </form>

                    <div className="d-flex justify-content-between mt-4">
                        <Link to={"account"}>Quay Lại </Link>
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

export default ChanglePassWord
