import "./home.css";
import React, { Component } from "react";
import Filters from "../../components/Filters/filters";
import GameList from "../../components/GameList/gameList";

class Home extends Component {
  state = { games: [], loading: true };

  updateGamesList = (games) => {
    this.setState({ games });
  };

  loadAllGames = () => {
    fetch("http://localhost:3000/games")
      .then((res) => {
        res.json().then((games) => {
          this.setState({ games, loading: false });
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.loadAllGames();
  }

  render() {
    document.title = "Game World";
    return (
      <>
        <h1 className="home__head-line">CATALOG</h1>
        <div className="home__cols-wrapper">
          <Filters
            updateGamesList={this.updateGamesList}
            loadAllGames={this.loadAllGames}
          />
          <GameList
            loading={this.state.loading}
            games={this.state.games}
            updateGamesList={this.updateGamesList}
          />
        </div>
      </>
    );
  }
}

export default Home;
