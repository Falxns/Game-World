import React, { Component } from "react";
import { Redirect } from "react-router";
import { userContext } from "../../context/user.context";

class Login extends Component {
  state = { email: "", password: "", isRedirected: false };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleButtonClick = () => {
    const { setUser } = this.context;

    const fd = new FormData();
    fd.append("email", this.state.email);
    fd.append("password", this.state.password);

    fetch("http://localhost:3000/login", {
      method: "POST",
      body: fd,
    })
      .then((res) => {
        const token = res.headers.get("x-auth-token");
        res
          .json()
          .then((data) => {
            setUser({ data, jwt: token });
            this.setState({ isRedirected: true });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  redirectToHome = () => {
    if (this.state.isRedirected) return <Redirect to={"/"} />;
  };

  render() {
    return (
      <>
        <h1 className="head-line">Login</h1>
        <div className="login-container">
          <label htmlFor="">Email:</label>
          <input
            type="email"
            name=""
            id=""
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <label htmlFor="">Password:</label>
          <input
            type="password"
            name=""
            id=""
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <button onClick={this.handleButtonClick}>Sign in</button>
        </div>
        {this.redirectToHome()}
      </>
    );
  }
}

Login.contextType = userContext;

export default Login;
