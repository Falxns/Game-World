import React, { Component } from "react";
import "./admin.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

class Admin extends Component {
  state = {
    games: [],
    users: [],
    choice: "games",
  };

  componentDidMount = () => {
    const client = new ApolloClient({
      uri: "http://localhost:3000/graphql",
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql`
          query {
            games {
              title
              platform
              genre
              maturity
              price
            }
          }
        `,
      })
      .then((res) => this.setState({ games: res.data.games }));
    client
      .query({
        query: gql`
          query {
            users {
              nickname
              email
              isAdmin
            }
          }
        `,
      })
      .then((res) => this.setState({ users: res.data.users }));
  };

  renderGames = () =>
    this.state.games.map((game) => {
      return (
        <tr>
          <td className="table__td">{game.title}</td>
          <td className="table__td">{game.platform}</td>
          <td className="table__td">{game.genre}</td>
          <td className="table__td">{game.maturity}+</td>
          <td className="table__td">
            {game.price ? game.price + "$" : "Free"}
          </td>
          <td>
            <button className="table__button"></button>
          </td>
        </tr>
      );
    });

  renderUsers = () =>
    this.state.users.map((user) => {
      return (
        <tr>
          <td className="table__td">{user.nickname}</td>
          <td className="table__td">{user.email}</td>
          <td className="table__td">{user.isAdmin ? "Yes" : "No"}</td>
          <td>
            <button className="table__button"></button>
          </td>
        </tr>
      );
    });

  renderTable = () => {
    if (this.state.choice === "games") {
      return (
        <table className="admin__table">
          <thead className="table__head">
            <tr>
              <th className="table__th">Title</th>
              <th className="table__th">Platform</th>
              <th className="table__th">Genre</th>
              <th className="table__th table__th_maturity">Maturity</th>
              <th className="table__th table__th_price">Price</th>
              <th className="table__th table__th_delete">Delete</th>
            </tr>
          </thead>
          <tbody className="table__body">{this.renderGames()}</tbody>
        </table>
      );
    } else {
      return (
        <table className="admin__table">
          <thead className="table__head">
            <tr>
              <th className="table__th">Username</th>
              <th className="table__th">Email</th>
              <th className="table__th table__th_admin">Is admin?</th>
              <th className="table__th table__th_delete">Delete</th>
            </tr>
          </thead>
          <tbody className="table__body">{this.renderUsers()}</tbody>
        </table>
      );
    }
  };

  handleGamesClick = () => {
    this.setState({ choice: "games" });
  };

  handleUsersClick = () => {
    this.setState({ choice: "users" });
  };

  render() {
    return (
      <>
        <div className="admin__container">
          <button className="admin__button" onClick={this.handleGamesClick}>
            Games
          </button>
          <button className="admin__button" onClick={this.handleUsersClick}>
            Users
          </button>
        </div>
        {this.renderTable()}
      </>
    );
  }
}

export default Admin;
