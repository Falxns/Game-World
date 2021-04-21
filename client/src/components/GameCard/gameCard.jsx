import "./gameCard.css";
import React, { Component } from "react";
import freePrice from "../../assets/icons/free.svg";
import { Link } from "react-router-dom";
import { userContext } from "../../context/user.context";

class GameCard extends Component {
  state = {};

  renderPrice() {
    if (this.props.gameData.price === 0)
      return <img src={freePrice} alt="Free" className="game-price-free" />;
    else return <p className="game-price">${this.props.gameData.price}</p>;
  }

  handleGameDeletion = () => {
    const { user } = this.context;

    fetch("http://localhost:3000/games/" + this.props.gameData._id, {
      method: "DELETE",
      headers: {
        "x-auth-token": user.jwt,
      },
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            console.log("Success:", data);
            this.props.removeGame(data._id);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { gameData } = this.props;

    return (
      <div className="game-card">
        <button
          onClick={this.handleGameDeletion}
          className="delete-button"
        ></button>
        <Link to={"/games/" + gameData._id}>
          <img src={gameData.imageUrl} alt="game" className="game-cover" />
          <p className="game-title">{gameData.title}</p>
          {this.renderPrice()}
        </Link>
      </div>
    );
  }
}

GameCard.contextType = userContext;

export default GameCard;
