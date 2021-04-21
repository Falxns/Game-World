import React, { Component } from "react";

class Login extends Component {
  state = {};
  render() {
    return (
      <>
        <h1 className="head-line">Login</h1>
        <div className="login-container">
          <label htmlFor="">Email:</label>
          <input type="email" name="" id="" />
          <label htmlFor="">Password:</label>
          <input type="password" name="" id="" />
          <button>Sign in</button>
        </div>
      </>
    );
  }
}

export default Login;
