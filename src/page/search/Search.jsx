import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useLazySearchProductQuery } from '../../app/service/productApi';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Search() {
  const { auth,isAuthenticated } = useSelector((state) => state.auth)
  const {keyword} = useParams();
  const  [getData, {data , isLoading}] = useLazySearchProductQuery()
  const natigave = useNavigate();
useEffect(
  ()=>{
        getData(
          {
            keyword : keyword,
            page : 0,
            pageSize : 8
          }
        )
  },[keyword]
)
const hanldenBtnAddFavorites = async (productId)=> {
  if(!isAuthenticated){
    toast.error("Hãy đăng nhập trước khi sử dụng tính năng này")
    return;
  }
  const objPush = {
    productId: productId,
    email: auth.email
  }
  try {
    const response = await axios.post(`http://localhost:8888/api/v1/user/addItemFavorites`, objPush);
    toast.success("Đã thêm Sản phẩm vào danh sách yêu thich ! ")

  } catch (err) {
    toast.error("Sản phẩm này đã trong danh sách yêu thích của bạn")
  }
}
const handlenBtnAddCart = async (id) => {
  if(!isAuthenticated){
    toast.error("Hãy đăng nhập trước khi sử dụng tính năng này")
    return;
  }
  const ObjAddCard = {
    email: auth.email,
    productId : id,
    nums : 1
  }
  try {
    const response1 = await axios.post(`http://localhost:8888/api/v1/user/addProductToOrder`, ObjAddCard);
    toast.success("Đã thêm Sản phẩm vào giỏ hàng  ! ")
  } catch (err) {
    toast.error("Số lượng sản phẩm tại Cửa hàng không đủ")
  }
}

const handlePageClick = (page)=>{
  getData(
    {
      keyword:keyword,
      page : page.selected,
      pageSize : 8
    }
  )

}
  if(isLoading){
    return <h3>is loading ..</h3>
  }
  
  return (
   
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />
    
     
     
     {/* Products */}
  <section>

    {data?.content.length == 0 && (
      <>
      <div class="d-flex align-items-center justify-content-center vh-100">
                <div class="text-center">
                    <h1 class="display-1 fw-bold">404</h1>
                    <p class="fs-3"> <span class="text-danger">Opps!</span> Không tìm thấy sản phẩm nào </p>
                    <p class="lead">
                       Không tìm thấy sản phẩm phù hợp cho bạn , vui lòng thử lại !! 
                    </p>
                    <Link to={"/"} class="btn btn-primary">Trang Chủ</Link>
                </div>
            </div>
      </>
    )
    }
   {data?.content.length > 0 &&
   <div className="container my-5">
   <header className="mb-4">
     <h3>Có {data?.totalElements} sản phẩm tìm thấy</h3>
   </header>
   <div className="row">
     {
       data?.content.map((e)=> (
         <div className="col-lg-3 col-md-6 col-sm-6 d-flex">
         <div className="card w-100 my-2 shadow-2-strong">

          <Link  to={`/product/${e?.id}`}>
          {e?.sales > 0 ? (
                        <div className="d-flex justify-content-between">
                          <h6><span className="badge bg-danger pt-1 mt-3 ms-2">{(Math.round(10 - ((e?.sales / e?.price) * 10)) * 10)}%</span></h6>

                        </div>
                      ) : (
                        <>
                          <div className="d-flex justify-content-between">
                            <h6><span className="badge bg-success pt-1 mt-3 ms-2">New Arrival</span></h6>

                          </div></>
                      )}


          <img src={e?.thumbail} className="card-img-top" style={{aspectRatio: '1 / 1'}} />
          </Link>
           
           <div className="card-body d-flex flex-column">
             <Link to={`/product/${e?.id}`} className="card-title">{e?.name}</Link>

             {e?.sales > 0 ? (
                          
                          <h6 className="card-text mb-1 me-1 text-danger">{
                            parseFloat(e?.sales).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          }đ
                          
                          <a class="text-warning text-test"><s>
                          {
                            parseFloat(e?.price).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          }đ
                            </s></a>
                          </h6>
                        
                        ) : (
                          <h6 className="card-text">
                            {
                            parseFloat(e?.price).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          } đ
                          </h6>
                        )
                        }
             <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
               <button onClick={()=>handlenBtnAddCart(e?.id)} className="btn btn-primary shadow-0 me-1">Add to cart</button>
               <button onClick={()=>hanldenBtnAddFavorites(e?.id)} className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg text-secondary px-1" /></button>
             </div>
           </div>
         </div>
       </div>
       )
       )
     }
   </div>
 </div>
   }
   <nav className="my-4" aria-label="...">
          <ul className="pagination pagination-circle justify-content-center">

            <ReactPaginate
              nextLabel="Trang tiếp theo >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={3}
              pageCount={data?.totalPages}
              previousLabel="< Trang trước"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </ul>
        </nav>
  </section>
    
    
    
    
    
    
    
    
    </>
  )
}

export default Search