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
      <td align="center" style={{backgroundImage: 'url(https://mdbootstrap.com/img/Photos/Others/slide.jpg)', backgroundSize: 'cover', backgroundPosition: 'top center', backgroundRepeat: 'no-repeat'}} background="https://mdbootstrap.com/img/Photos/Others/slide.jpg">
        <table border={0} align="center" width={590} cellPadding={0} cellSpacing={0} className="container590">
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
                                <div style={{lineHeight: '26px'}}>
                                  The all new AW16 range is out. View an exclusive preview.
                                </div>
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
                      <td align="center" style={{color: '#ffffff', fontSize: '14px', fontFamily: '"Work Sans", Calibri, sans-serif', lineHeight: '22px', letterSpacing: '2px'}}>
                        {/* main section button */}
                        <div style={{lineHeight: '22px'}}>
                          <a href style={{color: '#fff', textDecoration: 'none'}}>VIEW THE COLLECTION</a>
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
          <img src="https://logos-world.net/wp-content/uploads/2020/11/Razer-Symbol.jpg" className="w-100" />
          <a href="#!" data-mdb-toggle="modal" data-mdb-target="#exampleModal1">
            <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}} />
          </a>
        </div>
      </div>
      <div className="col-lg-4 mb-4 mb-lg-0">
        <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
          <img src="https://genk.mediacdn.vn/k:2015/1-1330685924221499238-1436347703185/logitech-doi-ten-thanh-logi-co-logo-moi-thiet-ke-hien-dai.jpg" className="w-100" />
          <a href="#!" data-mdb-toggle="modal" data-mdb-target="#exampleModal2">
            <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.2)'}} />
          </a>
        </div>
      </div>
      <div className="col-lg-4 mb-4 mb-lg-0">
        <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
          <img src="https://mdbcdn.b-cdn.net/img/screens/yt/screen-video-3.webp" className="w-100" />
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
            <h3>2017</h3>
            <p className="mb-0">Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto
              mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua
              dignissim per, habeo iusto primis ea eam.</p>
          </div>
        </div>
      </div>
      <div className="timeline right">
        <div className="card">
          <div className="card-body p-4">
            <h3>2016</h3>
            <p className="mb-0">Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto
              mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua
              dignissim per, habeo iusto primis ea eam.</p>
          </div>
        </div>
      </div>
   
      <div className="timeline left">
        <div className="card">
          <div className="card-body p-4">
            <h3>2007</h3>
            <p className="mb-0">Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto
              mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua
              dignissim per, habeo iusto primis ea eam.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" xl="8" className="text-center">
          <h3 className="mb-4">Testimonials</h3>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
            error amet numquam iure provident voluptate esse quasi, veritatis
            totam voluptas nostrum quisquam eum porro a pariatur veniam.
          </p>
        </MDBCol>
      </MDBRow>
      <MDBRow className="text-center">
        <MDBCol md="4" className="mb-5 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
              className="rounded-circle shadow-1-strong"
              width="150"
              height="150"
            />
          </div>
          <h5 className="mb-3">Maria Smantha</h5>
          <h6 className="text-primary mb-3">Web Developer</h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos
            id officiis hic tenetur quae quaerat ad velit ab hic tenetur.
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
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
              className="rounded-circle shadow-1-strong"
              width="150"
              height="150"
            />
          </div>
          <h5 className="mb-3">Lisa Cudrow</h5>
          <h6 className="text-primary mb-3">Graphic Designer</h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid commodi.
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
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
              className="rounded-circle shadow-1-strong"
              width="150"
              height="150"
            />
          </div>
          <h5 className="mb-3">John Smith</h5>
          <h6 className="text-primary mb-3">Marketing Specialist</h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti.
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