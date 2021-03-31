import "./gameList.css";
import React, { Component } from "react";
import GameCard from "../GameCard/gameCard";

class GameList extends Component {
  state = {
    games: [],
    loading: true,
  };

  componentDidMount() {
    fetch("http://localhost:3000/games")
      .then((res) => {
        res.json().then((games) => {
          this.setState({ games, loading: false });
        });
      })
      .catch((err) => console.log(err));
  }

  renderGames() {
    if (this.state.loading) return <h5 className="games-text">Loading...</h5>;

    if (this.state.games.length === 0)
      return <h5 className="games-text">There are no games :c</h5>;

    return this.state.games.map((game) => (
      <GameCard key={game._id} gameData={game} />
    ));
  }

  render() {
    return <div className="games-list">{this.renderGames()}</div>;
  }
}

export default GameList;
