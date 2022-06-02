import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigation = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handelSubmit = async (e) => {
    e.preventDefault();
    
    if (handelValidations()) {
      console.log(credentials.username);
      const response = await fetch(
        `http://localhost:8080/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: credentials.username,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        //redirect and save the auth token
        localStorage.setItem("token", json.authToken);
        navigation("/");
        props.showAlert("Welcome! Account Created.", "success");
      } else {
      }
    } else {
      props.showAlert("Invalid!", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handelValidations = () => {
    let UserName = credentials.username;
    let Email = credentials.email;
    let password = credentials.password;
    let error = {};
    let formisValid = true;

    //===================Validation Event Email==============================
    if (!UserName.toString().match(/^.+\s.+$/g)) {
      if (!UserName) {
        formisValid = false;
        error["UserName"] = "Cannot be empty";
      } else if (
        typeof UserName !== "undefined" 
      ) {
        if (
          !UserName.toString().match(/^[A-Za-z]{3,20}/g)
        ) {
          formisValid = false;
          error["UserName"] = "Please Enter a valid UserName"
          +"Min 3 charachter to 20 character max ";
        }
      }
    }

    //===================Validation Event Email==============================
    if (!Email.toString().match(/^.+\s.+$/g)) {
      if (!Email) {
        formisValid = false;
        error["Email"] = "Cannot be empty";
      } else if (
        typeof Email !== "undefined" &&
        !Email.toString().match(/^.+\s.+$/g)
      ) {
        if (
          !Email.toString().match(/^.+\s.+$/g) &&
          !Email.toString().match(
            /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
          )
        ) {
          formisValid = false;
          error["Email"] = "Please Enter a valid Email";
        }
      }
    }

    ///====================Password Validation ====================================
    if (!password.toString().match(/^.+\s.+$/g)) {
      if (!password) {
        formisValid = false;
        error["password"] = "Cannot be empty";
      } else if (
        typeof password !== "undefined" &&
        !password.toString().match(/^.+\s.+$/g)
      ) {
        if (
          !password.toString().match(/^[0-9A-Za-z@#]{6,12}/g) &&
          !password.toString().match(/^.+\s.+$/g)
        ) {
          formisValid = false;
          error["password"] = "Please Enter a valid password";
        }
      }
    }

    ///=======End of Validations======================

    setErrors(error);
    return formisValid;
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
          <div className="error-msg mt-1">{errors["UserName"]}</div>
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
          <div className="error-msg mt-1">{errors["Email"]}</div>
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
          <div className="error-msg mt-1">{errors["password"]}</div>
        </div>

        <button type="submit" className="btn button-button my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
