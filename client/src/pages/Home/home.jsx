import "./home.css";
import React, { Component } from "react";
import Filters from "../../components/Filters/filters";
import GameList from "../../components/GameList/gameList";

class Home extends Component {
  state = {};
  render() {
    return (
      <>
        <h1 className="head-line">CATALOG</h1>
        <div className="cols-wrapper">
          <Filters />
          <GameList />
        </div>
      </>
    );
  }
}

export default Home;
