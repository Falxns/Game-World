import React, { Component } from "react";
import { Redirect } from "react-router";
import { userContext } from "../../context/user.context";
import "./login.css";

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
            const user = { data, jwt: token };
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            this.setState({ isRedirected: true });
          })
          .catch(() => alert("Wrong email or password!"));
      })
      .catch((err) => console.log(err));
  };

  redirectToHome = () => {
    if (this.state.isRedirected) return <Redirect to={"/"} />;
  };

  render() {
    document.title = "Login";
    return (
      <>
        <h1 className="login__header">Login</h1>
        <div className="login__container">
          <label className="container__label" htmlFor="email">
            Email:
          </label>
          <input
            className="container__input"
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <label className="container__label" htmlFor="password">
            Password:
          </label>
          <input
            className="container__input"
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <button
            className="container__button"
            onClick={this.handleButtonClick}
          >
            Sign in
          </button>
        </div>
        {this.redirectToHome()}
      </>
    );
  }
}

Login.contextType = userContext;

export default Login;
