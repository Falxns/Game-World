import "./gameCard.css";
import React, { Component } from "react";
import freePrice from "../../assets/icons/free.svg";

class GameCard extends Component {
  state = {};

  isFree() {
    if (this.props.gameData.price === 0)
      return <img src={freePrice} alt="Free" className="game-price-free" />;
    else return <p className="game-price">${this.props.gameData.price}</p>;
  }

  render() {
    const { gameData } = this.props;

    return (
      <div className="game-card">
        <a href={"/delete" + gameData._id} className="delete-button"></a>
        <a href="http://localhost:3000/game/{{_id}}">
          <img src={gameData.imageUrl} alt="game" className="game-cover" />
          <p className="game-title">{gameData.title}</p>
          {this.isFree()}
        </a>
      </div>
    );
  }
}

export default GameCard;
