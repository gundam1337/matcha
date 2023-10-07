import React from "react";
import "../../styles/login.css";

const Login = (props) => {
  return (
    <>
      <div className="form1-container">
        <button className="close" onClick={props.onClick}>
          &times;
        </button>
        <div className="form1-content">
          <h2>
            <a href="./index.html">ChatSpace</a>
          </h2>
          <h3>Login</h3>
          <p>
            By continuing you agree to our terms and conditions of use as well
            as our cookie policy.
          </p>
          <form action="" method="POST">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input className="btn-login"  type="submit" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
