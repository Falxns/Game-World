import "./filters.css";
import React, { Component } from "react";

class Filters extends Component {
  state = {
    platform: "PC",
    genre: "Shooter",
    maturity: "4",
  };

  handlePlatformChange = (e) => {
    this.setState({
      platform: e.target.value,
    });
  };

  handleGenreChange = (e) => {
    this.setState({
      genre: e.target.value,
    });
  };

  handleMaturityChange = (e) => {
    this.setState({
      maturity: e.target.value,
    });
  };

  handleGameFilter = () => {
    fetch(
      `http://localhost:3000/games?platform=${this.state.platform}&genre=${this.state.genre}&maturity=${this.state.maturity}`
    )
      .then((res) => {
        res
          .json()
          .then((data) => {
            console.log("Success:", data);
            this.props.updateGamesList(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="filters-list">
        <ul className="filters-ul">
          <li className="filters-list-item">
            <label className="filter-label" htmlFor="platform">
              Platform
            </label>
            <select
              className="filter-select"
              name="platform"
              id="platform"
              value={this.state.platform}
              onChange={this.handlePlatformChange}
            >
              <option value="PC">PC</option>
              <option value="Xbox">Xbox</option>
              <option value="Playstation">Playstation</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
            </select>
          </li>
          <li className="filters-list-item">
            <label className="filter-label" htmlFor="genre">
              Genre
            </label>
            <select
              className="filter-select"
              name="genre"
              id="genre"
              value={this.state.genre}
              onChange={this.handleGenreChange}
            >
              <option value="Shooter">Shooter</option>
              <option value="RPG">RPG</option>
              <option value="Strategy">Strategy</option>
              <option value="Racing">Racing</option>
              <option value="Roguelike">Roguelike</option>
              <option value="Simulator">Simulator</option>
              <option value="Visual Novel">Visual Novel</option>
            </select>
          </li>
          <li className="filters-list-item">
            <label className="filter-label" htmlFor="maturity">
              Maturity rating
            </label>
            <select
              className="filter-select"
              name="maturity"
              id="maturity"
              value={this.state.maturity}
              onChange={this.handleMaturityChange}
            >
              <option value="4">4+</option>
              <option value="12">12+</option>
              <option value="16">16+</option>
              <option value="18">18+</option>
            </select>
          </li>
        </ul>
        <button onClick={this.handleGameFilter} className="filter-button">
          Apply
        </button>
        <button onClick={this.props.loadAllGames} className="filter-button">
          Reset
        </button>
      </div>
    );
  }
}

export default Filters;
