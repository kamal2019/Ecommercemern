import React, { useState } from "react";
import axios from "axios";
import "../index.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:90/customer/login", data)
      .then((response) => {
        if (response?.data?.success) {
          setMessage("User Logged In successfully");
        } else {
          setMessage("Invalid Credentials");
        }
        if (response?.data?.token) {
          localStorage.setItem("token", response?.data?.token);
        } else {
          localStorage.setItem("");
        }
        window.open("/", "_self");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!!message && (
            <div className="alert alert-primary error_box">{message}</div>
          )}
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitForm}
            >
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
          <p className="forgot-password text-left mt-2">
            <a href="/register">Signup/Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}
