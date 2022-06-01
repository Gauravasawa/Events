import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const host = "http://localhost:5000";
  const state = [];

  const [intialState, setIntialState] = useState(state);

  let location = useLocation();
  let navigate = useNavigate();
  const handelLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handelProfile = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setIntialState(json);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Navbar</span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                >
                  About
                </Link>
              </li>
            </ul>

            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                <Link className=" button-button mx-1" to="/login" role="button">
                  Login
                </Link>
                <Link
                  className=" button-button mx-2"
                  to="/signup"
                  role="button"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="white"
                  className="bi bi-person-circle mx-2"
                  viewBox="0 0 16 16"
                  onClick={handelProfile}
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>

                <button
                  className="button-button mx-2"
                  onClick={() => {
                    handelLogout();
                    props.showAlert("Hey There, Welcome Back", "success");
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
