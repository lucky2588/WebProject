import React from 'react'
import { useForm } from 'react-hook-form'
import { useRegisterMutation } from '../../app/service/authApi';
import { toast } from 'react-toastify';
import useRegister from '../../hooks/registerUser';



function Registration() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {submitUser} = useRegister();
  
    const onSubmit = (data) => {
        if (data.password !== data.passwordRepart) {
            toast.error("Mật khẩu không trùng nhau")
            return;
        }
        submitUser(data)
        if(submitUser(data) == 1){
         return;
        }
      
    }

    return (
        <>

            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />



            <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: '25px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng kí</p>
                                            <form method='Post' className="mx-1 mx-md-4" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control"
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
                                                        <label className="form-label" htmlFor="form3Example1c">Họ Tên </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-phone fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control"
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
                                                        <label className="form-label" htmlFor="form3Example1c"> Số Điện Thoại </label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-address-card fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">

                                                        <input type="text" id="form3Example1c" className="form-control"
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
                                                        <label className="form-label" htmlFor="form3Example2c">Địa chỉ </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control"
                                                            {...register("email"
                                                                , {
                                                                    required: true,
                                                                    pattern: {
                                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                                                      }
                                                                }
                                                            )}
                                                        />
                                                        {Object.keys(errors).length !== 0 && (
                                                            <ul>
                                                                {errors.email?.type === "required" &&
                                                                    <li className='text-danger'>Email không được để trống</li>
                                                                }
                                                                {errors.email?.type === "pattern" &&
                                                                    <li className='text-danger'>Email không hợp lệ</li>
                                                                }
                                                            </ul>
                                                        )
                                                        }
                                                        <label className="form-label" htmlFor="form3Example3c">Email </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" className="form-control"
                                                            {...register("password",
                                                                {
                                                                    required: true,
                                                                    minLength: 6
                                                                }
                                                            )}

                                                        />
                                                        {Object.keys(errors).length !== 0 && (
                                                            <ul>
                                                                {errors.password?.type === "required" &&
                                                                    <li className='text-danger'>Password  không được để trống</li>
                                                                }
                                                                {errors.password?.type === "minLength" &&
                                                                    <li className='text-danger'>Password cần đủ 6 kí tự trở lên</li>
                                                                }
                                                            </ul>
                                                        )
                                                        }
                                                        <label className="form-label" htmlFor="form3Example4c">Mật Khẩu </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4cd" className="form-control"
                                                            {...register("passwordRepart",
                                                                {
                                                                    required: true,
                                                                    minLength: 6,

                                                                }

                                                            )} />
                                                        {Object.keys(errors).length !== 0 && (
                                                            <ul>
                                                                {errors.passwordRepart?.type === "required" &&
                                                                    <li className='text-danger'>Password không được để trống</li>
                                                                }
                                                                {errors.password?.type === "value" &&
                                                                    <li className='text-danger'>Password cần đủ 6 kí tự trở lên</li>
                                                                }
                                                            </ul>
                                                        )
                                                        }

                                                        <label className="form-label" htmlFor="form3Example4cd">Nhập lại mật khẩu </label>
                                                    </div>
                                                </div>
                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3c" />
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        Tôi đồng ý với tất cả  <a href="#!">các điều khoản</a>
                                                    </label>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Đăng Kí</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU54vhRyicfcjIUK31foWSK_DYutzD3aeWRQ&usqp=CAU" className="img-fluid" alt="Sample image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Registration