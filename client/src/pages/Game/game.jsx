import "./game.css";
import React, { useEffect, useState } from "react";
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
  }, [gameId]);

  if (loading) {
    return <h1 className="game__warning">Loading...</h1>;
  }

  const renderPrice = () => {
    if (gameData.price)
      return (
        <input
          className="picture__button"
          type="button"
          value="Buy now"
        ></input>
      );
    return (
      <input className="picture__button" type="button" value="Play now"></input>
    );
  };

  const socket = new WebSocket("ws://localhost:3000");

  const renderComments = () => {
    return (
      <>
        <div className="comments__div">
          <h5 className="comments__username">Alexey</h5>
          <p className="comments__text">
            kjdffdjfdgljdgdfgjlhrejhjdfghdnbmfnvmdfngldfgdfgdfgkldfjgl
          </p>
        </div>
        <div className="comments__div">
          <h5 className="comments__username">Artyom</h5>
          <p className="comments__text">
            kjdffdjfdgljdgdfgjlhrejhjdf ghdnbmfnvmdfngl dfgdfgdjkj1
            u4iy3uihjkfhgudsklwefgkldfjgl
          </p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="game__content">
        <div className="game__picture">
          <img className="picture__img" src={gameData.imageUrl} alt="game" />
          <h1 className="picture__header">{gameData.title}</h1>
          {renderPrice()}
        </div>
        <ul className="game__ul">
          <li>
            <p className="game__p">Platform: {gameData.platform}</p>
          </li>
          <li>
            <p className="game__p">Genre: {gameData.genre}</p>
          </li>
          <li>
            <p className="game__p"> Maturity rating: {gameData.maturity}+</p>
          </li>
        </ul>
      </div>
      <div className="game__description">
        <p className="description__p_about">About</p>
        <p className="description__p_title">{gameData.title}</p>
        <img className="description__arrow" src={arrowIcon} alt="" />
        <p className="description__p_desc">{gameData.desc}</p>
      </div>
      <div className="game__comments">
        <h3 className="comments__header">Comments</h3>
        {renderComments()}
        <div className="game__new-comment">
          <textarea
            className="new-comment__textarea"
            cols="30"
            rows="10"
            placeholder="Write your comment here..."
          ></textarea>
          <button className="new-comment__button">Post</button>
        </div>
      </div>
    </>
  );
};

export default Game;
