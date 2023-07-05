import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function ForgetPassword() {
    const {register , handleSubmit, formState : {errors}} = useForm();
    const natigave = useNavigate();
     
    const onSubmit = async (data) => {
        try {
            const response = await axios.get(`http://localhost:8888/auth/confirmEmail/${data.email}`);
            toast.success(" Chúng tôi đã gửi một mã code về Email của bạn , hãy kiểm tra Email của bạn  !! ")
            natigave(`checkEmail?email=${data.email}`)
        } catch (error) {
            // Xử lý lỗi
            toast.warn("Chúng tôi không tìm thấy Email này !! vui lòng thử lại")
        }
    }
    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />  
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="card text-center center" style={{ width: '650px', height: '380px' , marginLeft: "35%" }}>
                <div className="card-header h5 text-white bg-primary">Quên Mật Khẩu </div>
                <div className="card-body px-5">
                    <p className="card-text py-2">
                        Nhập Email của bạn vào đây , chúng tôi sẽ gửi cho bạn 1 mã token để xác thực tài khoản 
                    </p>
                    <div className="form-outline">
                         <form onSubmit={handleSubmit(onSubmit)}>           
                        <input type="email" id="typeEmail" name='email' className="form-control my-3" 
                         {...register("email",
                         {
                             required: true,
                             pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email không hợp lệ',
                              }
                         }
                     )
                     } 
                     />
                      {/* 
                       */}
                       {errors.email && <span>{errors.email.message}</span>}
                        <label className="form-label" htmlFor="typeEmail">Email </label>
                        <button className='btn-block btn-link btn-form custom-btn' type='submit' >Xác Nhận</button>
                        </form>
                    </div>                    
                    <div className="d-flex justify-content-between mt-4">
                        <a className href="#">Quay Lại</a>
                        <a className href="#">Trang Chủ</a>
                    </div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

        </>
    )
}

export default ForgetPassword