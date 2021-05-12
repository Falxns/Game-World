import React, { Component } from "react";
import "./admin.css";

class Admin extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="admin__container">
          <button className="admin__button">Games</button>
          <button className="admin__button">Users</button>
        </div>
        <table className="admin__table">
          <thead className="table__head">
            <tr>
              <th className="table__th">Title</th>
              <th className="table__th">Platform</th>
              <th className="table__th">Genre</th>
              <th className="table__th table__th_maturity">Maturity</th>
              <th className="table__th table__th_price">Price</th>
              <th className="table__th">Description</th>
              <th className="table__th table__th_delete">Delete</th>
            </tr>
          </thead>
          <tbody className="table__body">
            <tr>
              <td className="table__td">dfgdf</td>
              <td className="table__td">PC</td>
              <td className="table__td">dfghghgf</td>
              <td className="table__td">16</td>
              <td className="table__td">0</td>
              <td className="table__td">fghkjfghkfjfgkhfgjhkjhflk</td>
              <td>
                <button className="table__button"></button>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default Admin;
