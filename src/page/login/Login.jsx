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
                        <img src="https://file.hstatic.net/1000238289/file/ma_13-2_logo_0c0a073ce9aa430f92c9b5abe3e7279a_grande.jpg" style={{ width: '185px' }} alt="logo" />
                       
                      </div>
                      <br></br>
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
                          
                          <p className="mb-0 me-2">Bạn đã có tài khoản ?</p>
                          <button type="button" className="btn btn-outline-danger" onClick={handlenBtnCreate} >Đăng kí</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Như chúng tôi đã từng, và chúng tôi sẽ luôn tiếp tục </h4>
                      <p className="small mb-0">“Đem đến một lối sống khỏe mạnh và văn minh” — Đây là tầm nhìn của người sáng lập TOTO và triết lý ấy không ngừng được truyền tiếp cho mỗi nhân viên của công ty như là Triết lý Doanh nghiệp của Tập đoàn TOTO.
Tầm nhìn này đã kéo dài hơn một thế kỷ và là trọng tâm trong các hoạt động của Tập đoàn TOTO, và là
nền tảng cho việc sản xuất và kinh doanh của chúng tôi.
Chúng tôi sẽ nỗ lực để đảm bảo tầm nhìn này được truyền tải sang các thế hệ tương lai bằng cách cung cấp các sản phẩm và dịch vụ TOTO an toàn và đáng tin cậy cho khách hàng trên toàn thế giới. Bằng cách đó,
chúng tôi sẽ “Tạo ra một phong cách cuộc sống phong phú, thoải mái với các thiết bị sứ vệ sinh.” Đây là
yếu tố chủ đạo trong Triết lý kinh doanh của Tập đoàn TOTO..</p>
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