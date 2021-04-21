import React, { Component } from "react";

class Registration extends Component {
  state = {};
  render() {
    return (
      <>
        <h1 className="head-line">Registration</h1>
        <div className="registration-container">
          <label htmlFor="">Nickname:</label>
          <input type="text" name="" id="" />
          <label htmlFor="">Email:</label>
          <input type="email" name="" id="" />
          <label htmlFor="">Password:</label>
          <input type="password" name="" id="" />
          <button>Submit</button>
        </div>
      </>
    );
  }
}

export default Registration;
