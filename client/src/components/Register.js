import React, { useState } from "react";
import axios from "axios";
import "../index.scss";

export default function Login() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState();
  const [age, setAge] = useState(0);
  const [message, setMessage] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    const formData = {
      fullName: fullName,
      email: email,
      password: password,
      phoneNo: number,
      age: age,
    };

    axios
      .post("http://localhost:90/customer/register", formData)
      .then((response) => {
        if (response?.data?.message) {
          setMessage(response?.data?.message);
        } else {
          setMessage(response?.data?.errorMessage);
        }
        // setMessage(response?.data?.errorMessage);
        window.open("/", "_self");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up/Register</h3>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
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

          <div className="form-group mt-3">
            <label>Phone Number</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Age</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
              onClick={formSubmit}
            >
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2"></p>
        </div>
      </form>
    </div>
  );
}
