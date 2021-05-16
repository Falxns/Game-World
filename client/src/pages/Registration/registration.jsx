import React, { Component } from "react";
import { Redirect } from "react-router";
import { userContext } from "../../context/user.context";
import "./registration.css";

class Registration extends Component {
  state = {
    nickname: "",
    email: "",
    password: "",
    adminChecked: false,
    adminPassword: "",
    isRedirected: false,
  };

  handleNicknameChange = (e) => {
    this.setState({ nickname: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleIsAdminChange = (e) => {
    const inputAdminPassword = document.querySelector("#adminPassword");
    const labelAdminPassword = document.querySelector("#labelForAdminPassword");
    if (e.target.checked) {
      inputAdminPassword.classList.remove("container__input_hidden");
      labelAdminPassword.classList.remove("container__label_hidden");
    } else {
      inputAdminPassword.classList.add("container__input_hidden");
      labelAdminPassword.classList.add("container__label_hidden");
    }
    this.setState({ adminChecked: e.target.checked });
  };

  handleAdminPasswordChange = (e) => {
    this.setState({ adminPassword: e.target.value });
  };

  handleButtonClick = () => {
    const { setUser } = this.context;

    const fd = new FormData();
    fd.append("nickname", this.state.nickname);
    fd.append("email", this.state.email);
    fd.append("password", this.state.password);

    if (this.state.adminChecked) {
      if (this.state.adminPassword === "verystrongpassword") {
        fd.append("isAdmin", true);
      } else {
        alert("Wrong admin password!");
        return;
      }
    } else {
      fd.append("isAdmin", false);
    }

    fetch("http://localhost:3000/registration", {
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
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  redirectToHome = () => {
    if (this.state.isRedirected) return <Redirect to={"/"} />;
  };

  render() {
    document.title = "Sign up";
    return (
      <>
        <h1 className="registration__header">Registration</h1>
        <div className="registration__container">
          <label className="container__label" htmlFor="nickname">
            Nickname:
          </label>
          <input
            className="container__input"
            type="text"
            id="nickname"
            value={this.state.nickname}
            onChange={this.handleNicknameChange}
          />
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
          <label className="container__label" htmlFor="isAdmin">
            Admin?
          </label>
          <input
            className="container__checkbox"
            type="checkbox"
            id="isAdmin"
            onChange={this.handleIsAdminChange}
          />
          <label
            className="container__label container__label_hidden"
            id="labelForAdminPassword"
            htmlFor="adminPassword"
          >
            Admin password
          </label>
          <input
            className="container__input container__input_hidden"
            type="password"
            id="adminPassword"
            value={this.state.adminPassword}
            onChange={this.handleAdminPasswordChange}
          />
          <button
            className="container__button"
            onClick={this.handleButtonClick}
          >
            Submit
          </button>
        </div>
        {this.redirectToHome()}
      </>
    );
  }
}

Registration.contextType = userContext;

export default Registration;
