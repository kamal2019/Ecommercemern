import React, { useState } from "react";
import axios from "axios";
import "../index.scss";

import esewa from "../images/esewa.png"
import khalti from "../images/khalti.png"
import imepay from "../images/imepay.png"
import cellpay from "../images/cellpay.png"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const sum = window.location.pathname
  const cost = sum.slice(20-25)
  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Please select any one payment method to proceed</h3>
          <div className="d-grid gap-2 mt-3">
            <div className="row payment_services">
                <div className="col">
                    <a href="/esewa.com">
                        <img src={esewa}/>
                    </a>
                </div>
                <div className="col">
                    <a>
                        <img src={khalti}/>
                    </a>
                </div>
                <div className="col">
                    <a href="/esewa.com">
                        <img src={imepay}/>
                    </a>
                </div>
                <div className="col">
                    <a href="/esewa.com">
                        <img src={cellpay}/>
                    </a>
                </div>
            </div>
            {/* <button
              type="submit"
              className="btn btn-primary"
              onClick={submitForm}
            >
              Submit
            </button> */}
            <p>Your Total Ordered Summary : {cost}</p>
          </div>
        </div>
      </form>
    </div>
  );
}
