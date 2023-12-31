import React from "react";
import "./footer.css";

function Footer() {
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css"
        rel="stylesheet"
      />
      <footer
        className="text-center text-lg-start text-muted mt-3"
        style={{ backgroundColor: "#333" }}
      >
        {/* Section: Links  */}
        <section className>
          <div className="container text-center text-md-start pt-4 pb-4">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-12 col-lg-3 col-sm-12 mb-2">
                {/* Content */}
                <a href="https://mdbootstrap.com/" target="_blank" className>
                  <img
                    src="https://kbis.com/wp-content/uploads/2021/03/TOTO-logo.jpg"
                    height={55}
                  />
                </a>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* Links */}
                <h6 className="text-uppercase text-dark fw-bold mb-2">
                  Cửa hàng
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white" href="#">
                      Tìm kiếm sản phảm
                    </a>
                  </li>
                  <li>
                    <a className="text-white" href="#">
                      Danh mục{" "}
                    </a>
                  </li>
                  <li>
                    <a className="text-white" href="#">
                      Bài Viết
                    </a>
                  </li>
                </ul>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* Links */}
                <h6 className="text-uppercase text-dark fw-bold mb-2">
                  Thông tin
                </h6>
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white" href="#">
                      Về chúng tôi
                    </a>
                    <br>
                    </br>
                    <p className="text-white">
                  {" "}
                 Tuyển Dụng{" "}
                </p>
                <p className="text-white">
                  {" "}
                  Về TOTO{" "}
                </p>
                <p className="text-white">
                  {" "}
                 Dịch vụ bảo hành{" "}
                </p>
                <p className="text-white">
                  {" "}
                Tài Liệu Tham Khảo{" "}
                </p>
                  </li>
                </ul>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-6 col-sm-4 col-lg-2">
                {/* Links */}
                <h6 className="text-uppercase text-dark fw-bold mb-2">
                  Hỗ trợ
                </h6>
                
                <ul className="list-unstyled mb-4">
                  <li>
                    <a className="text-white hover" href="#">
                      Hỗ trợ khách hàng
                    </a>
                  </li>
                </ul>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-12 col-sm-12 col-lg-3">
                {/* Links */}
                <h6 className="text-uppercase text-white fw-bold mb-2">
                  Nhận thông báo về Chúng tôi
                </h6>
                <p className="text-white">
                  {" "}
                  Nếu bạn muốn thông báo về các chương trình giảm giá , hãy nhập
                  email của bạn bên dưới{" "}
                </p>
                <p className="text-white">
                  {" "}
                  CÔNG TY TNHH TOTO VIỆT NAM Lô F1,F2, F3, F4, KCN Thăng Long,
                  Đông Anh, Hà Nội, Việt Nam ĐT: (84-24) 38811926 Ext.:101 Fax:
                  (84-24) 38811928 NHÀ MÁY SẢN XUẤT TẠI HƯNG YÊN Lô M7, M8, N3
                  và RE8, KCN Thăng Long II, Phường Phùng Chí Kiên, Thị Xã Mỹ
                  Hào, Hưng Yên ĐT: (84-221) 3974683
                </p>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control border"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn btn-light border shadow-0"
                    type="button"
                    id="button-addon2"
                    data-mdb-ripple-color="dark"
                  >
                    Gửi
                  </button>
                </div>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        <div className>
          <div className="container">
            <div className="d-flex justify-content-between py-4 border-top">
              {/*- payment -*/}
              <div>
                <i className="fab fa-lg fa-cc-visa text-dark" />
                <i className="fab fa-lg fa-cc-amex text-dark" />
                <i className="fab fa-lg fa-cc-mastercard text-dark" />
                <i className="fab fa-lg fa-cc-paypal text-dark" />
              </div>
              {/*- payment -*/}
              {/*- language selector -*/}
              <div className="dropdown dropup">
                <a
                  className="dropdown-toggle text-dark"
                  href="#"
                  id="Dropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  {" "}
                  <i />
                  Lên Đầu{" "}
                </a>
              </div>
              {/*- language selector -*/}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
