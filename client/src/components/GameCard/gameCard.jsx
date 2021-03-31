import "./gameCard.css";
import React, { Component } from "react";
import freePrice from "../../assets/icons/free.svg";
import { Link } from "react-router-dom";

class GameCard extends Component {
  state = {};

  renderPrice() {
    if (this.props.gameData.price === 0)
      return <img src={freePrice} alt="Free" className="game-price-free" />;
    else return <p className="game-price">${this.props.gameData.price}</p>;
  }

  render() {
    const { gameData } = this.props;

    return (
      <div className="game-card">
        <a href={"/delete/" + gameData._id} className="delete-button"></a>
        <Link to={"/games/" + gameData._id}>
          <img src={gameData.imageUrl} alt="game" className="game-cover" />
          <p className="game-title">{gameData.title}</p>
          {this.renderPrice()}
        </Link>
      </div>
    );
  }
}

export default GameCard;
