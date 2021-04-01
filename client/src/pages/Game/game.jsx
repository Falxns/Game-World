import "./game.css";
import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router";
import arrowIcon from "../../assets/icons/double-arrow.svg";

const Game = () => {
  const { gameId } = useParams();

  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/games/" + gameId)
      .then((res) => {
        res.json().then((game) => {
          setGameData(game);
          setLoading(false);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <h1 className="games-text">Loading...</h1>;
  }

  const renderPrice = () => {
    if (gameData.price)
      return (
        <input className="button-play" type="button" value="Buy now"></input>
      );
    else
      return (
        <input className="button-play" type="button" value="Play now"></input>
      );
  };

  return (
    <>
      <div className="game-area">
        <div className="picture-area">
          <img src={gameData.imageUrl} className="image" />
          <h1 className="head-line-game">{gameData.title}</h1>
          {renderPrice()}
        </div>
        <ul className="info-list">
          <li>
            <p className="info-label">Platform: {gameData.platform}</p>
          </li>
          <li>
            <p className="info-label">Genre: {gameData.genre}</p>
          </li>
          <li>
            <p className="info-label"> Maturity rating: {gameData.maturity}+</p>
          </li>
        </ul>
      </div>
      <div className="desc-area">
        <p className="p-about">ABOUT</p>
        <p className="p-title">{gameData.title}</p>
        <img className="desc-arrow" src={arrowIcon} />
        <p className="p-desc">{gameData.desc}</p>
      </div>
    </>
  );
};

export default Game;
