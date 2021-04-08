import "./gameList.css";
import React, { Component } from "react";
import GameCard from "../GameCard/gameCard";

class GameList extends Component {
  removeGame = (deletedId) => {
    let games = this.props.games.filter((game) => {
      if (game._id !== deletedId) {
        return true;
      } else return false;
    });
    this.props.updateGamesList(games);
  };

  renderGames() {
    if (this.props.loading) return <h5 className="games-text">Loading...</h5>;

    if (this.props.games.length === 0)
      return <h5 className="games-text">There are no games :c</h5>;

    return this.props.games.map((game) => (
      <GameCard key={game._id} gameData={game} removeGame={this.removeGame} />
    ));
  }

  render() {
    return <div className="games-list">{this.renderGames()}</div>;
  }
}

export default GameList;
