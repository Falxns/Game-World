import React, { Component } from "react";
import { Redirect } from "react-router";

class Registration extends Component {
  state = {
    nickname: "",
    email: "",
    password: "",
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

  handleButtonClick = () => {
    const fd = new FormData();
    fd.append("nickname", this.state.nickname);
    fd.append("email", this.state.email);
    fd.append("password", this.state.password);

    fetch("http://localhost:3000/registration", {
      method: "POST",
      body: fd,
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            console.log("Success:", data);
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
        <h1 className="head-line">Registration</h1>
        <div className="registration-container">
          <label htmlFor="">Nickname:</label>
          <input
            type="text"
            name=""
            id=""
            value={this.state.nickname}
            onChange={this.handleNicknameChange}
          />
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
          <button onClick={this.handleButtonClick}>Submit</button>
        </div>
        {this.redirectToHome()}
      </>
    );
  }
}

export default Registration;
