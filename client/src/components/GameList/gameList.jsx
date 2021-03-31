import "./gameList.css";
import React, { Component } from "react";
import GameCard from "../GameCard/gameCard";

const fetchGames = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          _id: 123,
          title: "Genshin Impact",
          platform: "PC",
          genre: "Shooter",
          maturity: 4,
          price: 5,
          desc: "jkfdhsjfhgjkf",
          imageUrl:
            "http://localhost:3000/images/games/605a64d709b1740e7d86c84a.jpg",
        },
        {
          _id: 234,
          title: "Genshin Impact",
          platform: "PC",
          genre: "Shooter",
          maturity: 4,
          price: 0,
          desc: "jkfdhsjfhgjkf",
          imageUrl:
            "http://localhost:3000/images/games/605a64d709b1740e7d86c84a.jpg",
        },
        {
          _id: 345,
          title: "Genshin Impact",
          platform: "PC",
          genre: "Shooter",
          maturity: 4,
          price: 0,
          desc: "jkfdhsjfhgjkf",
          imageUrl:
            "http://localhost:3000/images/games/605a64d709b1740e7d86c84a.jpg",
        },
      ]);
    }, 3000)
  );
};

class GameList extends Component {
  state = {
    games: [],
    loading: true,
  };

  componentDidMount() {
    // fetch("localhos...")
    fetchGames()
      .then((games) => {
        this.setState({ games, loading: false });
      })
      .catch((err) => console.log(err));
    this.setState({ games: [] });
  }

  renderGames() {
    if (this.state.loading) return <h5>Loading...</h5>;

    if (this.state.games.length === 0) return <h5>There are no games :c</h5>;

    return this.state.games.map((game) => (
      <GameCard key={game._id} gameData={game} />
    ));
  }

  render() {
    return <div className="games-list">{this.renderGames()}</div>;
  }
}

export default GameList;
