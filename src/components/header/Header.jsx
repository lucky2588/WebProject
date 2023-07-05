import React, { useState } from 'react'
import "./header.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle';
import { logout } from '../../app/slice/authSlice';

function Header() {
    const { auth, isAuthenticated } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text , setText] = useState("")
    

    const handlenBtnSubmit = ()=> {
       if(text === ""){
        toast.error("hãy viết tên sản phẩm bạn muốn tìm kiếm vào đây")
        return;
       }
      navigate(`search/${text}`)
    }

    const handlenBtnLogout = ()=> {
        dispatch(logout());
        navigate("/login")
    }


    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />

            <header>
                {/* Jumbotron */}
                <div className="p-3 text-center bg-white border-bottom header-info">
                    <div className="container">
                        <div className="row gy-3">
                            {/* Left elements */}
                            <div className="col-lg-2 col-sm-4 col-4">
                                <Link to={"/"} target="_blank" className="float-start">
                                    <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height={35} />
                                </Link>
                            </div>
                            {/* Left elements */}
                            {/* Center elements */}
                            <div className="order-lg-last col-lg-5 col-sm-8 col-8 ">
                                <div className="d-flex float-end">
                                {
                                        isAuthenticated? (
                                            <MDBDropdown>
                                            <MDBDropdownToggle >{auth?.name} </MDBDropdownToggle>
                                            <MDBDropdownMenu>
                                                <MDBDropdownItem link ><Link to={"/account"}> Thông tin cá nhân</Link> </MDBDropdownItem>
                                                <MDBDropdownItem link ><Link to={'/account/MyBill'}>Đơn Hàng của tôi</Link> </MDBDropdownItem>
                                                <MDBDropdownItem link ><Link>Lịch Sử Mua Hàng</Link> </MDBDropdownItem>
                                                <MDBDropdownItem link ><button className="btn btn-primary btn-rounded " onClick={handlenBtnLogout}>Đăng Xuất</button> </MDBDropdownItem>
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                        ):
                                        (
                                            <Link to={"/login"}
                                        className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center item-icon-header" target="_blank">
                                        <i className="fas fa-user-alt m-1 me-md-2" /><p className="d-none d-md-block mb-0"> Đăng Nhập</p>

                                    </Link>
                                        )
                                    }
                                    <Link to={
                                        isAuthenticated ? "/account/wishList" : "/login"
                                    } className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center item-icon-header" target="_blank"> <i className="fas fa-heart m-1 me-md-2" /><p className="d-none d-md-block mb-0">Yêu Thích</p> </Link>
                                    <Link to={isAuthenticated ?
                                         "/account/myOrder" : "/login"
                                        } className="border rounded py-1 px-3 nav-link d-flex align-items-center item-icon-header" target="_blank"> <i className="fas fa-shopping-cart m-1 me-md-2" /><p className="d-none d-md-block mb-0">Giỏ Hàng</p> </Link>
                          

                                </div>
                            </div>
                            {/* Center elements */}
                            {/* Right elements */}
                            <div className="col-lg-5 col-md-12 col-12">
                                <div className="input-group float-center">
                                    <div className="form-outline">
                                        <input type="search" id="form1" className="form-control" value={text} onChange={(e)=>setText(e.target.value)} />
                                        <label className="form-label" htmlFor="form1"  >Search</label>
                                    </div>
                                    <button type="button" onClick={handlenBtnSubmit} className="btn btn-primary shadow-0">
                                        <i className="fas fa-search" />
                                    </button>
                                </div>
                            </div>
                            {/* Right elements */}
                        </div>
                    </div>
                </div>
                {/* Jumbotron */}
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#f5f5f5' }}>
                    {/* Container wrapper */}
                    <div className="container justify-content-center justify-content-md-between">
                        {/* Toggle button */}
                        <button className="navbar-toggler border text-dark py-2" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarLeftAlignExample" aria-controls="navbarLeftAlignExample" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-bars" />
                        </button>
                        {/* Collapsible wrapper */}
                        <div className="collapse navbar-collapse" id="navbarLeftAlignExample">
                            {/* Left links */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link text-dark" aria-current="page" to={"/"} >Trang Chủ</Link>
                                </li>
                                <li className="nav-item item-header">
                                    <Link className="nav-link text-dark" to={"/category"} >Danh Mục</Link>
                                </li>
                                <li className="nav-item item-header">
                                    <Link className="nav-link text-dark" to={"/ListBlog"} >Bài Viết</Link>
                                </li>
                                <li className="nav-item item-header">
                                    <Link className="nav-link text-dark" to={"/code"} >Mã Giảm Giá</Link>
                                </li>
                                <li className="nav-item item-header">
                                    <Link className="nav-link text-dark" to={"/contact"}> Hỗ trợ khách hàng </Link>
                                </li>
                                <li className="nav-item item-header" item-header>
                                    <Link className="nav-link text-dark" to={"/introduce"}>Về Chúng Tôi </Link>
                                </li>
                            </ul>
                            {/* Left links */}
                        </div>
                    </div>
                    {/* Container wrapper */}
                </nav>
                {/* Navbar */}
            </header>

















        </>
    )
}

export default Header