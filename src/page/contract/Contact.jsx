import React from 'react'

function Contact() {
    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />

            
            <br></br>
            {/*Section: FAQ*/}
            <section>
                <h3 className="text-center mb-4 pb-2 text-primary fw-bold">FAQ</h3>
                <p className="text-center mb-5">
                    Find the answers for the most frequently asked questions below
                </p>
                <div className="row">
                    <div className="col-md-6 col-lg-4 mb-4">
                        <h6 className="mb-3 text-primary"><i className="far fa-paper-plane text-primary pe-2" /> A simple
                            question?</h6>
                        <p>
                            <strong><u>Absolutely!</u></strong> We work with top payment companies which guarantees
                            your
                            safety and
                            security. All billing information is stored on our payment processing partner.
                        </p>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                        <h6 className="mb-3 text-primary"><i className="fas fa-pen-alt text-primary pe-2" /> A question
                            that
                            is longer then the previous one?</h6>
                        <p>
                            <strong><u>Yes, it is possible!</u></strong> You can cancel your subscription anytime in
                            your
                            account. Once the subscription is
                            cancelled, you will not be charged next month.
                        </p>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                        <h6 className="mb-3 text-primary"><i className="fas fa-user text-primary pe-2" /> A simple
                            question?
                        </h6>
                        <p>
                            Currently, we only offer monthly subscription. You can upgrade or cancel your monthly
                            account at any time with no further obligation.
                        </p>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                        <h6 className="mb-3 text-primary"><i className="fas fa-rocket text-primary pe-2" /> A simple
                            question?
                        </h6>
                        <p>
                            Yes. Go to the billing section of your dashboard and update your payment information.
                        </p>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                        <h6 className="mb-3 text-primary"><i className="fas fa-home text-primary pe-2" /> A simple
                            question?
                        </h6>
                        <p><strong><u>Unfortunately no</u>.</strong> We do not issue full or partial refunds for any
                            reason.</p>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                        <h6 className="mb-3 text-primary"><i className="fas fa-book-open text-primary pe-2" /> Another
                            question that is longer than usual</h6>
                        <p>
                            Of course! We’re happy to offer a free plan to anyone who wants to try our service.
                        </p>
                    </div>
                </div>
            </section>
            {/*Section: FAQ*/}

<section className="section contact">
  <div className="row gy-4">
    <div className="col-xl-6" style={{paddingLeft: '5%'}}>
      <div className="row">
        <div className="col-lg-5 item-card" style={{paddingBottom: '10%', paddingRight: '50px'}}>
          <div className="info-box card">
            <i className="bi bi-geo-alt" />
            <h3>Address</h3>
            <p>A108 Adam Street,<br />New York, NY 535022</p>
          </div>
        </div>
        <div className="col-lg-5 item-card" style={{paddingBottom: '10%', paddingRight: '50px'}}>
          <div className="info-box card">
            <i className="bi bi-geo-alt" />
            <h3>Address</h3>
            <p>A108 Adam Street,<br />New York, NY 535022</p>
          </div>
        </div>
        <div className="col-lg-5 item-card" style={{paddingBottom: '10%', paddingRight: '50px', paddingTop: '50px'}}>
          <div className="info-box card">
            <i className="bi bi-geo-alt" />
            <h3>Address</h3>
            <p>A108 Adam Street,<br />New York, NY 535022</p>
          </div>
        </div>
        <div className="col-lg-5 item-card" style={{paddingBottom: '10%', paddingRight: '50px', paddingTop: '50px'}}>
          <div className="info-box card">
            <i className="bi bi-geo-alt" />
            <h3>Address</h3>
            <p>A108 Adam Street,<br />New York, NY 535022</p>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-6">
      <div className="card p-4">
        <form method="post">
          <div className="row gy-4">
            <div className="col-md-6">
              <input type="text" name="name" className="form-control" placeholder="Your Name" required />
            </div>
            <div className="col-md-6 ">
              <input type="email" className="form-control" name="email" placeholder="Your Email" required />
            </div>
            <div className="col-md-12">
              <input type="text" className="form-control" name="subject" placeholder="Subject" required />
            </div>
            <div className="col-md-12">
              <textarea className="form-control" name="message" rows={6} placeholder="Message" required defaultValue={""} />
            </div>
            <div className="col-md-12 text-center">
              <div className="loading">Loading</div>
              <div className="error-message" />
              <div className="sent-message">Your message has been sent. Thank you!</div>
              <button type="submit" style={{backgroundColor: 'lightcyan'}}>Send Message</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
















        </>
    )
}

export default Contact