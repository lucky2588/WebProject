import React from 'react'
import "./payment.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PaymentContinue() {
    const { auth, isAuthenticated } = useSelector((state) => state.auth)
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }
    return (
        
        <>
           <br></br>
           <br></br>
       <br></br>
       <br></br>
        <section className="vh-90" style={{backgroundColor: '#f5f7fa'}}>
       <br></br>
       <br></br>
       <br></br>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-5">
              <div className="card">
                <div className="card-body">
                  <blockquote className="blockquote blockquote-custom bg-white px-3 pt-4">
                    <div className="blockquote-custom-icon bg-info shadow-1-strong">
                      <i className="fa fa-quote-left text-white" />
                    </div>
                    <p className="mb-0 mt-2 font-italic">
                     Cảm ơn  
                      <a href="#" className="text-info"> {auth?.name}</a> 
                      đã ủng hộ  . Hãy chờ chúng tôi phản hồi về đơn hàng của bạn nhé  ^^

                    </p>
                    <footer className="blockquote-footer pt-4 mt-4 border-top">
                    <cite title="Source Title">Quay lại tiếp tục mua sắm</cite>
                    <br></br>
                    <br></br>
                      <Link  to={"/"} className="btn btn-success shadow-0 border text-center" >Trang Chủ</Link>
                      
                     
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
       
    
      </section>
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

export default PaymentContinue