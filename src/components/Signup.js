import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigation = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: credentials.username,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //redirect and save the auth token
      localStorage.setItem("token", json.authToken);
      navigation("/");
      props.showAlert("Welcome! Account Created.", "success");
    } else {
      props.showAlert("Invalid!", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ marginTop: "110px" }}>
      <h2 className="title" id="title">
        Create Account
      </h2>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            <strong style={{ color: "tomato" }}>User Name</strong>
          </label>
          <input
            type="text"
            className="form-control text-input-css"
            id="username"
            name="username"
            aria-describedby="emailHelp"
            value={credentials.username}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <strong style={{ color: "tomato" }}>Email</strong>
          </label>
          <input
            type="email"
            className="form-control text-input-css"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <strong style={{ color: "tomato" }}>Password</strong>
          </label>
          <input
            type="password"
            className="form-control text-input-css"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn button-button my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
