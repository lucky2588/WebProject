import React from 'react'
import "./wishList.css"
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router';
import { useGetFavoritesQuery, useLazyGetFavoritesQuery } from '../../app/service/userApi';
import { number } from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

function WishList() {
    const { auth, isAuthenticated , token } = useSelector((state) => state.auth)
    const [getData, { data, isLoading }] = useLazyGetFavoritesQuery();
    const natigave = useNavigate();
    useEffect(()=>{
        getData(auth.email);
     },[])

    if (!isAuthenticated) {
       natigave("/login")
    }
    const handlenBtnDetail = (productId) => {
        natigave(`/product/${productId}`)
    }
    const handlenBtnRemove = async (productId) => {
        const objPush = {
            productId: productId,
            email: auth.email
        }
        const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          };
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/user/removeItemFavorites`, objPush,config);
            toast.success("Xóa Sản Phẩm thành công ! ")
            getData(auth.email)
        } catch (err) {
            alert(err);
        }
    }



    const handlenBtnAddCart = async (id) => {
        const ObjAddCard = {
          email: auth.email,
          productId : id,
          nums : 1
        }
        const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          };
        try {
          const response1 = await axios.post(`http://localhost:8888/api/v1/order/addProductToOrder`, ObjAddCard,config);
          toast.success("Đã thêm Sản phẩm vào giỏ hàng  ! ")
        } catch (err) {
          toast.error("Số lượng sản phẩm tại cửa hàng không đủ")
        }
      }

    if (isLoading) {
        return <h2>Is Loading .. </h2>
    }






    return (
        <>
            <div>
                {data?.check == 0 ? (
                    <>
                        <div class="d-flex align-items-center justify-content-center vh-100">
                            <div class="text-center">
                                <h1 class="display-1 fw-bold">Note</h1>
                                <p class="fs-3"> <span class="text-danger">Ồ! </span>Bạn chưa thêm SP nào vào danh sách yêu thích của mình</p>
                                <p class="lead">
                                    Hãy quay lại và tìm thêm sản phẩm yêu thích nhé
                                </p>
                                <a href="index.html" class="btn btn-primary">Trang chủ</a>
                            </div>
                        </div>

                    </>
                ) : (
                    <>
                        <div className="main card-body p-3 w-60">
                            <h4 className="text-center my-3 pb-3">Danh Sách Sản Phẩm Yêu Thích </h4>
                            <table className="table mb-12">
                                <thead>
                                    <tr>
                                    <th scope="col" className='text-center' >  Số Thứ Tự</th>
                                        <th scope="col" className='text-center' >Tên Sản Phẩm<main></main></th>
                                        <th scope="col" className='text-center' >Trạng Thái</th>
                                        <th scope="col" className='text-center' >Lựa Chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.favoritesInfo.products.map((a, index) => (
                                        <tr>
                                            <th scope="row" className='text-center'>{index + 1}</th>
                                            <td className='text-center'>{a?.name}</td>
                                            <td className='text-center'>Còn hàng</td>
                                            <td className='text-center'>
                                                <button className="btn btn-success ms-1" onClick={() => handlenBtnDetail(a?.id)}>Xem Chi Tiết</button>
                                                <button className="btn btn-danger" onClick={() => handlenBtnRemove(a?.id)}>Xóa Sản Phẩm</button>
                                            </td>
                                        </tr>
                                    )
                                    )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <section>
                            <h1>Thông tin về các sản phẩm</h1>
                            <div className="list">
                                {data?.favoritesInfo.products.map((e, index) => (
                                    <div className="product  d-flex flex-column pt-3 border-top">
                                        <img alt="avatar" className="rounded-circle img-fluid w-100 img-item" style={{ width: '450px' }} src={e?.thumbail} />
                                        <div><h2>{e?.name}</h2>
                                            <p className="price">{e?.price}<sup>.đ</sup></p>
                                            <p className="descr">{e?.content}
                                                <b></b></p>
                                            <br />
                                            <button href="#" className='btn btn-primary shadow-0 me-1'  onClick={()=>handlenBtnAddCart(e?.id)}><p>Thêm vào giỏ hàng</p></button></div>
                                        <p className='text-center'> {e?.name}</p>
                                    </div>
                                )

                                )
                                }
                            </div>
                        </section>
                    </>
                )
                }
            </div >














        </>
    )
}

export default WishList
