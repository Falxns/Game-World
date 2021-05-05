import "./game.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import arrowIcon from "../../assets/icons/double-arrow.svg";
import { io } from "socket.io-client";

const Game = () => {
  const { gameId } = useParams();

  const [socket, setSocket] = useState(null);
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
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

  useEffect(() => {
    const socket = io("ws://localhost:3000");
    socket.on("connect_error", (m) => {
      console.log("error", m);
    });
    socket.on("connect", () => {
      console.log("socket.io connection open");
      socket.send("comments", gameId);
    });
    socket.on("message", (type, comments) => {
      switch (type) {
        case "comments":
          console.log(comments);
          setComments(comments);
          break;
        default:
          break;
      }
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
      console.log("socket.io disconnected");
    };
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

  const handleCommentDeletion = (e) => {
    const parent = e.target.parentElement;
    socket.send(
      "delete-comment",
      gameId,
      parent.children[1].innerText,
      parent.children[2].innerText
    );
  };

  const renderComments = () =>
    comments.map((comment) => {
      return (
        <div key={comment._id} className="comments__div">
          <button
            onClick={handleCommentDeletion}
            className="comments__button_delete"
          />
          <h5 className="comments__username" value={comment.nickname}>
            {comment.nickname}
          </h5>
          <p className="comments__text" value={comment.text}>
            {comment.text}
          </p>
        </div>
      );
    });

  const sendComment = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    socket.send("add-comment", gameId, user.data.nickname, text);
    setText("");
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
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
            value={text}
            onChange={handleTextChange}
          ></textarea>
          <button onClick={sendComment} className="new-comment__button">
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default Game;
