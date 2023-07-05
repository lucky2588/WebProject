import React, { useState } from 'react';

import "./login.css"
import { useSelector } from 'react-redux';
import { useLoginMutation } from '../../app/service/authApi';
import { set } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginResquest] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
}

  const handlenSubmit = (e) => {
    if(email === "" || password === "" ){
      alert("Vui lòng nhập đủ email và password")
      navigate("/login")
    }
    e.preventDefault();
    LoginResquest(
      {
         email,password
      }
    )
    .unwrap()
    .then((res)=>{
    toast.success("Đăng nhập thành công")
    navigate("/")}
    )
   .catch((err)=> toast.error("Đăng nhập thất bại ")
    )
  }

  const handlenForgetPassword = ()=> {
    navigate("/forgetPassword")
  }
  const handlenBtnCreate = () => {
    navigate("/register")
  }

  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />

      <section className="h-100 gradient-form" style={{ backgroundColor: '' }}>
        <div className="main container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{ width: '185px' }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                      </div>
                      <form method='post' onSubmit={handlenSubmit} >
                        <p>Vui lòng nhập tài khoản và mật khẩu của bạn </p>
                        <div className="form-outline mb-4">
                          <input type="email" id="form2Example11" className="form-control" placeholder="input email address" value={email}
                          onChange={e=>setEmail(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form2Example11">Tài khoản  </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input type="password" id="form2Example22" className="form-control" 
                          value={password}
                          onChange={e=>setPassword(e.target.value)}
                          />
                          <label className="form-label" htmlFor="form2Example22">Mật Khẩu </label>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Đăng Nhập
                            </button>
                            <button type="button" className="btn btn-" onClick={handlenForgetPassword}>Quên Mật Khẩu</button>
                        </div>
                        
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" className="btn btn-outline-danger" onClick={handlenBtnCreate} >Create new</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>













    </>


  );
}

export default Login;