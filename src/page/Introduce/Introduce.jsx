import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./introduce.css"

export default function Intro() {
  return (
    <>
  
{/* main section */}
<table border={0} width="100%" cellPadding={0} cellSpacing={0} bgcolor="2a2e36">
  <tbody><tr>
      <td align="center" width={800} height={500} style={{backgroundImage: '', backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat'}} background="https://hungthinhhome.vn/upload/images/TOTO-1.jpg">
        <table border={0} align="center" width={600} cellPadding={0} cellSpacing={0} className="container590">
          <tbody><tr>
              <td height={50} style={{fontSize: '50px', lineHeight: '50px'}}>&nbsp;</td>
            </tr>
            <tr>
              <td align="center">
                <table border={0} width={380} align="center" cellPadding={0} cellSpacing={0} style={{borderCollapse: 'collapse', msoTableLspace: '0pt', msoTableRspace: '0pt'}} className="container590">
                  <tbody><tr>
                      <td align="center">
                        <table border={0} align="center" cellPadding={0} cellSpacing={0} className="container580">
                          <tbody><tr>
                              <td align="center" style={{color: '#cccccc', fontSize: '16px', fontFamily: '"Work Sans", Calibri, sans-serif', lineHeight: '26px'}}>
                                {/* section text ======*/}
                              </td>
                            </tr>
                          </tbody></table>
                      </td>
                    </tr>
                  </tbody></table>
              </td>
            </tr>
            <tr>
              <td height={25} style={{fontSize: '25px', lineHeight: '25px'}}>&nbsp;</td>
            </tr>
            <tr>
              <td align="center">
                <table border={0} align="center" width={250} cellPadding={0} cellSpacing={0} style={{border: '2px solid #ffffff'}}>
                  <tbody><tr>
                      <td height={10} style={{fontSize: '10px', lineHeight: '10px'}}>&nbsp;</td>
                    </tr>
                    <tr>
                      <td align="center" className="btn-primary" style={{color: '#ffffff', fontSize: '20px', fontFamily: '"Work Sans", Calibri, sans-serif', letterSpacing: '2px'}}>
                        {/* main section button */}
                        <div style={{lineHeight: '22px'}}>
                          <a  href style={{ textDecoration: 'none'}}>Khám Phá Thêm</a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td height={10} style={{fontSize: '10px', lineHeight: '10px'}}>&nbsp;</td>
                    </tr>
                  </tbody></table>
              </td>
            </tr>
            <tr>
              <td height={50} style={{fontSize: '50px', lineHeight: '50px'}}>&nbsp;</td>
            </tr>
          </tbody></table>
      </td>
    </tr>
  </tbody></table>
{/* end section */}



{/* Modal gallery */}
<section className>
  {/* Section: Images */}
  <section className>
    <div className="row">
      <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
        <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
          <img src="https://coninco.com.vn/sites/default/files/HDKD_21_21_coninco6_0.jpg" className="w-100" />
          <a href="#!" data-mdb-toggle="modal" data-mdb-target="#exampleModal1">
            <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}} />
          </a>
        </div>
      </div>
      <div className="col-lg-4 mb-4 mb-lg-0">
        <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
          <img src="https://media1.nguoiduatin.vn/m24/upload/3-2023/images/2023-08-23/anh-1-product--1--1692786083-966-width1458height1141.jpg?v=1692860286" className="w-100" />
          <a href="#!" data-mdb-toggle="modal" data-mdb-target="#exampleModal2">
            <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}} />
          </a>
        </div>
      </div>
      <div className="col-lg-4 mb-4 mb-lg-0">
        <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
          <img src="https://www.coninco.com.vn/sites/default/files/HDKD_47_20_coninco12.jpg" className="w-100" />
          <a href="#!" data-mdb-toggle="modal" data-mdb-target="#exampleModal3">
            <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}} />
          </a>
        </div>
      </div>
    </div>
  </section>
  {/* Section: Images */}
  {/* Section: Modals */}
  <section className>
    {/* Modal 1 */}
    <div className="modal fade" id="exampleModal1" tabIndex={-1} aria-labelledby="exampleModal1Label" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/A3PDXmYoF5U" title="YouTube video" allowFullScreen />
          </div>
          <div className="text-center py-3">
            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* Modal 2 */}
    <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModal2Label" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/wTcNtgA6gHs" title="YouTube video" allowFullScreen />
          </div>
          <div className="text-center py-3">
            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* Modal 3 */}
    <div className="modal fade" id="exampleModal3" tabIndex={-1} aria-labelledby="exampleModal3Label" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/vlDzYIIOYmM" title="YouTube video" allowFullScreen />
          </div>
          <div className="text-center py-3">
            <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Section: Modals */}
</section>
{/* Modal gallery */}




    <section style={{backgroundColor: '#F0F2F5'}}>
  <div className="container py-5">
    <div className="main-timeline">
      <div className="timeline left">
        <div className="card">
          <div className="card-body p-4">
            <h3>ngày 15 tháng 05 năm 1917</h3>
            <p className="mb-0">Được thành lập</p>
          </div>
        </div>
      </div>
      <div className="timeline right">
        <div className="card">
          <div className="card-body p-4">
            <h3>1946</h3>
            <p className="mb-0">TOTO bắt đầu sản xuất phụ kiện và vòi nước kim loại cũng như gốm sứ. Các sản phẩm này đã trở thành hai lĩnh vực cốt lõi của TOTO..</p>
          </div>
        </div>
      </div>
   
      <div className="timeline left">
        <div className="card">
          <div className="card-body p-4">
            <h3>2002</h3>
            <p className="mb-0">Thành lập TOTO Việt Nam.</p>
          </div>
        </div>
      </div>

      <div className="timeline right">
        <div className="card">
          <div className="card-body p-4">
            <h3>2016</h3>
            <p className="mb-0">Khai trương SHOWROOM CHÍNH THỨC đầu tiên của TOTO Việt Nam tại tòa nhà 1A, Số 1A Phạm Ngọc Thạch, Q1, TP.HCM</p>
          </div>
        </div>
      </div>

      <div className="timeline left">
        <div className="card">
          <div className="card-body p-4">
            <h3>2019</h3>
            <p className="mb-0">TOTO Việt Nam khánh thành nhà máy thứ 3 tại Hưng Yên.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" xl="8" className="text-center">
          <h3 className="mb-4">Các đánh giá về TOTO</h3>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0">
            Dưới đây là một số chuyên giá nhận xét về các sản phẩm và dịch vụ của TOTO
          </p>
        </MDBCol>
      </MDBRow>
      <MDBRow className="text-center">
        <MDBCol md="4" className="mb-5 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src="https://cdn3.dhht.vn/wp-content/uploads/2023/09/shark-hung-la-ai-sinh-nam-bao-nhieu-tieu-su-giau-co-nao.jpg"
              className="rounded-circle shadow-1-strong"
              width="150"
              height="150"
            />
          </div>
          <h5 className="mb-3">Shark Hưng</h5>
          <h6 className="text-primary mb-3">Nhà Đầu Tư</h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
           Thương hiệu TOTO là một trong những thương hiệu yêu thích của tôi . tôi đã dùng và trải nghiệm trong nhiều năm
          </p>
          <MDBTypography
            listUnStyled
            className="d-flex justify-content-center mb-0"
          >
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon
                fas
                icon="star-half-alt"
                size="sm"
                className="text-warning"
              />
            </li>
          </MDBTypography>
        </MDBCol>
        <MDBCol md="4" className="mb-5 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Chi_Pu_as_H%E1%BA%A1_Linh_in_She_Was_Pretty_%28M%E1%BB%91i_t%C3%ACnh_%C4%91%E1%BA%A7u_c%E1%BB%A7a_t%C3%B4i%29.jpg"
              className="rounded-circle shadow-1-strong"
              width="150"
              height="150"
            />
          </div>
          <h5 className="mb-3">Chi Pu</h5>
          <h6 className="text-primary mb-3">Ca sĩ / Diễn viên</h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
            Tôi đã mua và trải nghiệm về Sản phẩm bên Toto trong nhiều năm và rất hài lòng 
          </p>
          <MDBTypography
            listUnStyled
            className="d-flex justify-content-center mb-0"
          >
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
          </MDBTypography>
        </MDBCol>
        <MDBCol md="4" className="mb-5 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_718xrqqRZLOrRXDaV-2j7j_hDrsxmHxRGw&usqp=CAU"
              className="rounded-circle shadow-1-strong"
              width="150"
              height="150"
            />
          </div>
          <h5 className="mb-3">Chi Dân</h5>
          <h6 className="text-primary mb-3">Ca sĩ</h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
             Là một khách hàng thân quen bên TOTO. Dân khẳng định đây là một trong những thương hiệu về Vệ sinh hàng đầu Việt Nam
          </p>
          <MDBTypography
            listUnStyled
            className="d-flex justify-content-center mb-0"
          >
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon far icon="star" size="sm" className="text-warning" />
            </li>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

</>
  );
}