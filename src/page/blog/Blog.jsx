import React, { useEffect, useState } from 'react'
import './blog.css'
import { useParams } from 'react-router'
import { useGetBlogByIdQuery, useGetBlogWithBrandQuery, useGetProductWithBrandQuery, useLazyGetCommentBlogQuery } from '../../app/service/blogApi';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
function Blog() {
  const { blogId } = useParams();
  const { data, isLoading, isError } = useGetBlogByIdQuery(blogId);
  const [getComment, { data: listComment, isLoading: isLoadingComment }] = useLazyGetCommentBlogQuery();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [cmt, setCmt] = useState();
  const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
  const { data: blogBrand } = useGetBlogWithBrandQuery(
    {
      blogId: blogId,
      brandId: data?.brand.id
    }
  );
  const { data: productData } = useGetProductWithBrandQuery(data?.brand.id);
  const [turn, setTurn] = useState("")

  useEffect(() => {
    getComment(
      {
        page: 0,
        pageSize: 5,
        blogId: blogId
      }
    );
  }, [turn, data])

  const navigate = useNavigate();
  if (isError) {
    toast.error("Đã có lỗi xảy ra , Vui lòng chờ")
  }

  const handleChange = (event) => {
    setText(event.target.value);
  };


  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập trước khi bình luận")
      navigate("/login")
    }
    const commentPush = {
      email: auth.email,
      commentOfUser: data.commentOfUser
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios.post(`http://localhost:8888/api/v1/public/sendCommentBlog/${blogId}`, commentPush, config);
      toast.success("Cảm ơn bạn đã bình luận về bài viết của chúng tôi ! ")
      setTurn(data.commentOfUser)
      getComment(
        {
          page: 0,
          pageSize: 5,
          blogId: blogId
        }
      );

    } catch (err) {
      alert(err);
    }
  }
  const handlePageClick = (page) => {
    getComment(
      {
        page: page.selected,
        pageSize: 5,
        blogId: blogId
      }
    );
  }

  const handleShowModal = (id) => {
    setShowModal(true);
   
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handlenBtnDelete = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
      try {
        const response = await axios.delete(`http://localhost:8888/api/v1/public/deleteCommentOfBlog/${cmt}`,config);
        toast.success("Đã xóa bình luận ! ")
        getComment(
          {
            page: 0,
            pageSize: 5,
            blogId: blogId
          }
        );
        setShowModal(false);
        
  
      } catch (err) {
        alert(err);
      }
    };


  



  if (isLoading) {
    return <h2>Is Loading .. </h2>
  }



  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />
      <div>
        {/*Main Navigation*/}
        {/*Main layout*/}
        <main className="mt-4 mb-5">
          <div className="container">
            {/*Grid row*/}
            <div className="row">
              {/*Grid column*/}
              <div className="col-md-8 mb-4">
                {/*Section: Post data-mdb*/}
                <section className="border-bottom mb-4">
                  <br></br>
                  <h2 className='text-center'>{data?.title}</h2>
                  <img src={data?.thumbail} className="img-fluid shadow-2-strong rounded-5 mb-4" alt="" />
                  <div className="row align-items-center mb-4">
                    <div className="col-lg-6 text-center text-lg-start mb-3 m-lg-0">
                      <img src={data} className="rounded-5 shadow-1-strong me-2" height={35} alt="" loading="lazy" />
                      <span>  <u> </u> tác giả </span>
                      <a href className="text-dark"> {data?.user.name}</a>
                      <br />
                      <br></br>
                      <div id="span-view" >Lượt xem : {data?.viewBlog}</div>
                    </div>

                  </div>
                </section>
                {/*Section: Post data-mdb*/}
                {/*Section: Text*/}
                <section>

                  <p><strong>{data?.content}</strong></p>
                  <p>
                    {data?.description}
                  </p>
                </section>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Modal show={showModal} onHide={handleCloseModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>  Delete this Comment ?</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Do you sure Delete this Comment </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                      Cancle
                    </Button>
                    <Button variant="danger" onClick={handlenBtnDelete}>
                      Sure
                    </Button>
                  </Modal.Footer>
                </Modal>
                <section className="border-bottom mb-3">
                  <p className="text-center"><strong> Bình Luận : {listComment?.length}</strong></p>
                  {/* Comment */}
                  {
                    listComment?.content.map((comment) => (
                      <div className="row mb-4">
                        <div className="col-2">
                          <img src={comment?.user.avatar} className="img-fluid shadow-1-strong rounded-5" alt="" />
                        </div>
                        <div className="col-10">


                          <p className="mb-2"><strong>{comment?.user.name}
                            {comment.user.id == auth?.id &&
                              (
                                <>
                                  <span class="btn-custom">
                                    <button type="button" class=" btn  btn-danger" onClick={() => handleShowModal(comment.id)}>Remove</button>

                                  </span>
                                </>
                              )
                            }
                          </strong></p>
                          <span className='text'> {new Date(...comment?.createAt).toLocaleDateString()}   </span>
                          <p>
                            <br />
                            {comment?.content}
                          </p>
                        </div>
                      </div>
                    ))}

                </section>
                <nav className="my-4" aria-label="...">
                  <ul className="pagination pagination-circle justify-content-center">

                    <ReactPaginate
                      nextLabel="Trang tiếp theo >"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={listComment?.totalPages}
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
                <section>
                  <p className="text-center"><strong> Để lại bình luận của bạn  </strong></p>
                  <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Message input */}
                    <div className="form-outline mb-4">
                      <textarea className="form-control" id="form4Example3" rows={4} defaultValue={turn} onChange={handleChange}
                        {...register("commentOfUser",
                          {
                            required: true
                          }
                        )
                        }
                      />
                      {Object.keys(errors).length !== 0 && (
                        <ul>
                          {errors.commentOfUser?.type === "required" &&
                            <li className='text-danger'>Bình luận không để trống !! </li>
                          }
                        </ul>
                      )
                      }
                      <label className="form-label" htmlFor="form4Example3">Gõ bình luận</label>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block mb-4">
                      Bình Luận
                    </button>
                  </form>
                </section>
                {/*Section: Reply*/}
              </div>
              {/*Grid column*/}
              {/*Grid column*/}
              <div className="col-md-4 mb-4 slide-bar">
                {/*Section: Sidebar*/}
                <section className="sticky-top" style={{ top: '80px' }}>
                  {/*Section: Ad*/}
                  <section className="text-center border-bottom pb-4 mb-4 layout-fix">
                    <h3>Bài viết tương tự</h3>
                    {
                      blogBrand?.map((blog) => (
                        <div className="card">
                          <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">

                            <Link to={`/blog/${blog.id}`} >
                              <img src={blog?.thumbail} className="img-fluid" />
                              <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }} />
                            </Link>
                          </div>
                          <div className="card-body">
                            <Link to={`/blog/${blog.id}`}>
                              <h5 className="card-title">{blog?.title} </h5>
                            </Link>
                            <p className="card-text">{blog?.content}</p>
                            <Link to={`/blog/${blog.id}`} className="btn btn-primary">Xem thêm</Link>
                          </div>
                        </div>
                      )
                      )
                    }
                  </section>
                  {/*Section: Ad*/}
                  {/*Section: Video*/}
                  <section className="text-center layout-fix">
                    <h5 className="mb-3">Sản phẩm gợi ý</h5>
                    <div className="embed-responsive embed-responsive-16by9 shadow-4-strong">
                      <div className="card">
                        <div className="card-body">
                          <br />
                          {
                            productData?.map((e) => (
                              <div className="d-flex mb-3">
                                <Link to={`/product/${e?.id}`} className="me-3">
                                  <img src={e?.thumbail} style={{ minWidth: '80px', height: '86px' }} className="img-md img-thumbnail" />
                                </Link>
                                <div className="info">
                                  <Link to={`/product/${e?.id}`} className="nav-link mb-1">
                                    {e?.name}
                                  </Link>
                                  <strong className="text-dark">
                                    {
                                      parseFloat(e?.price).toLocaleString('en-US', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                        minimumIntegerDigits: 3,
                                      })
                                    }đ

                                  </strong>
                                </div>
                              </div>
                            )
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </section>

                </section>

              </div>

            </div>

          </div>

        </main>
        {/*Main layout*/}

      </div>
















    </>
  )
}

export default Blog