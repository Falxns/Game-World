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
              <th className="table__th table__th_delete">Delete</th>
            </tr>
          </thead>
          <tbody className="table__body">{this.renderGames()}</tbody>
        </table>
      </>
    );
  }
}

export default Admin;
