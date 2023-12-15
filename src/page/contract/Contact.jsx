import React from "react";

function Contact() {
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

      <br></br>
      {/*Section: FAQ*/}
      <section>
        <h3 className="text-center mb-4 pb-2 text-primary fw-bold">
          TOTO showroom trên Việt Nam{" "}
        </h3>
        <p className="text-center mb-5">
          Find the answers for the most frequently asked questions below
        </p>
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 text-primary">
              <i className="far fa-paper-plane text-primary pe-2" /> TOTO
              Showroom Hà Nội
            </h6>
            <p>
              <strong>
                <u></u>
              </strong>{" "}
              Địa chỉ: Tầng 2, Tháp 2, Tòa nhà Capital Place, Số 29 Liễu Giai,
              Quận Ba Đình, Hà Nội
            </p>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 text-primary">
              <i className="fas fa-pen-alt text-primary pe-2" /> TOTO Showroom
              Sài Gòn
            </h6>
            <p>
              <strong>
                <u></u>
              </strong>{" "}
              Địa chỉ: Tầng 2, Tháp 2, Tòa nhà Capital Place, Số 29 Liễu Giai,
              Quận Ba Đình, Hà Nội
            </p>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <h6 className="mb-3 text-primary">
              <i className="fas fa-book-open text-primary pe-2" /> Another
              question that is longer than usual
            </h6>
            <p>
              Of course! We’re happy to offer a free plan to anyone who wants to
              try our service.
            </p>
          </div>
        </div>
      </section>
      {/*Section: FAQ*/}

      <section className="section contact">
        <div className="row gy-4">
          <div className="col-xl-5" style={{ paddingLeft: "5%" }}>
            <div className="row">
              <div
                className="col-lg-10  item-card"
                style={{ paddingBottom: "10%", paddingRight: "50px" }}
              >
                <div className="info-box card">
                  <i className="bi bi-geo-alt" />
                  <img src='https://www.google.com/maps/d/thumbnail?mid=1hSJI5w-gsG-RFj5jcwFJKP_7aEU&hl=vi'></img>
                </div>
                <div className="info-box card">
                  <i className="bi bi-geo-alt" />
                  <img src='https://vn.toto.com/wp-content/uploads/2021/05/accesstoto.png'></img>
                </div>
              </div>
           
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card p-4">
              <form method="post">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 ">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={6}
                      placeholder="Message"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message" />
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                    <button
                      type="submit"
                      style={{ backgroundColor: "lightcyan" }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
