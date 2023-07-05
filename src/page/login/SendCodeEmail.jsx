import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'




function SendCodeEmail() {
    let [searchParams, setSearchParams] = useSearchParams();
      const emailUser = searchParams.get("email");
      const {register , handleSubmit, formState : {errors}} = useForm();
      const natigave = useNavigate();
      
      
      const onSubmit = async (data) => {
       const dataPush = {
        email : emailUser,
        token : data.token
       }
       try {
        const response = await axios.post(`http://localhost:8888/auth/confirmPassword`, dataPush);
        alert("Xác minh thành công , chúng tôi đã gửi mật khẩu mới qua tài khoản Email của bạn , hãy sử dụng nó để đăng nhập !! ")
      } catch {
        alert("Vui lòng");
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
                <div className="card-header h5 text-white bg-primary">Nhận mã code để xác thực tài khoản</div>
                <div className="card-body px-5">
                    <p className="card-text py-2">
                        Chúng tôi đã gửi một mã code đến địa chỉ email của bạn .Hãy nhập nó ở dưới để xác thực tài khoản
                    </p>
                    <div className="form-outline">


                    <form onSubmit={handleSubmit(onSubmit)}>           
                        <input  name='token' className="form-control my-3" 
                         {...register("token",
                         {
                             required: true
                            
                         }
                     )
                     } 
                     />
                      {/* 
                       */}
                       {errors.token && <span>{errors.token.message}</span>}
                        <label className="form-label" htmlFor="typeEmail">Mã Code </label>
                        <button className='btn-block btn-link btn-form custom-btn' type='submit' >Xác Nhận</button>
                        </form>
                    </div> 
                    <div className="d-flex justify-content-between mt-4">
                        <a className href="#">Quay Lại </a>
                        <a className href="#">Xác Nhận</a>
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

export default SendCodeEmail