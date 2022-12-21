import React from "react";
import "../index.scss";

function CtaSection() {
  return (
    <div>
      <section id="cta" className="cta mt-4">
        <div className="container" data-aos="zoom-in">
          <div className="row">
            <div className="col-lg-9 text-center text-lg-start">
              <h3>Login to Bookverse</h3>
              <p>
                Join BookVerse now and get access to millions of book from
                worldwide and increase your knowledge
              </p>
            </div>
            <div className="col-lg-3 cta-btn-container text-center">
              <a className="cta-btn align-middle" href="#">
                Register Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CtaSection;
