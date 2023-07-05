import React, { useEffect } from 'react'
import "./listBlog.css"
import ReactPaginate from 'react-paginate'
import { useLazyGetBlogsQuery } from '../../app/service/blogApi'
import { Link } from 'react-router-dom';

function ListBlog() {
     const [getBlogs , {data : blogPage , isLoading}] = useLazyGetBlogsQuery();
     useEffect(()=>{
        getBlogs(
            {   
                page : 0,
                pageSize :6,
            }
        );
     },[])

     if(isLoading){
      return  <h2>... Is Loading</h2>
     }
    const handlePageClick = (page) => {
        getBlogs(
            {
                page: page.selected,
                pageSize: 6
            }
        );
    }
    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />

            <div>
                {/* Navbar */}

                {/* Navbar */}
                {/* Jumbotron */}
                <br />
                {/*Main Navigation*/}
                {/*Main layout*/}
                <main className="my-5">
                    <div className="container">
                        {/*Section: Content*/}
                        <section className="text-center">
                            <h4 className="mb-5"><strong>Tin tức về Công Nghệ </strong></h4>
                            <div className="row">

                                {/* <div className="col-lg-4 col-md-12 mb-4">
                                    <div className="card">
                                        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                            <img src="https://row.hyperx.com/cdn/shop/products/hyperx_cloud_alpha_blackred_4_detachable_2048x2048.jpg?v=1662420668" className="img-fluid" />
                                            <a href="#!">
                                                <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }} />
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Post title</h5>
                                            <p className="card-text">
                                                Some quick example text to build on the card title and make up the bulk of the
                                                card's content.
                                            </p>
                                            <a href="#!" className="btn btn-primary">Read</a>
                                        </div>
                                    </div>
                                </div> */}
                                {
                                    blogPage?.content.map((blog,index)=>(
                                        <div className="col-lg-4 col-md-12 mb-4">
                                        <div className="card">
                                            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                                
                                                <Link to={`/blog/${blog?.id}`}>
                                                <img src={blog.thumbail} className="img-fluid" />
                                                    <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }} />
                                                </Link>
                                            </div>
                                            <div className="card-body">
                                                <Link to={`/blog/${blog?.id}`}>
                                                <h5 className="card-title text-limit">{blog.title}</h5>
                                                </Link>
                                                
                                                <p className="card-text text-limit">
                                                   {blog.content}
                                                </p>
                                                <Link to={`/blog/${blog.id}`} className="btn btn-primary">Read</Link>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                    )
                                }
                            </div>
                        </section>
                        {/*Section: Content*/}
                        {/* Pagination */}
                        <nav className="my-4" aria-label="...">
                            <ul className="pagination pagination-circle justify-content-center">
                          
                                <ReactPaginate
                                    nextLabel="Trang tiếp theo >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={blogPage?.totalPages}
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
                    </div>
                </main>
            </div>












        </>
    )
}

export default ListBlog