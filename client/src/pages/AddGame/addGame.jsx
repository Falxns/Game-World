import "./addGame.css";
import React, { Component } from "react";
import defaultImage from "../../assets/images/default-img.png";
import { Redirect } from "react-router";
import { userContext } from "../../context/user.context";

class AddGame extends Component {
  constructor() {
    super();
    this.imgRef = React.createRef();
  }

  state = {
    title: "",
    platform: "PC",
    genre: "Shooter",
    maturity: "4",
    price: "0",
    description: "",
    image: {},
    isRedirected: false,
  };

  handleFileInput = (event) => {
    const fr = new FileReader();

    fr.onload = () => {
      this.imgRef.current.src = fr.result;
    };

    fr.readAsDataURL(event.target.files[0]);
    this.setState({ image: event.target.files[0] });
  };

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
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

  handlePriceChange = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleButtonClick = () => {
    const fd = new FormData();
    fd.append("title", this.state.title);
    fd.append("platform", this.state.platform);
    fd.append("genre", this.state.genre);
    fd.append("maturity", this.state.maturity);
    fd.append("price", this.state.price);
    fd.append("desc", this.state.description);
    fd.append("image", this.state.image);

    const { user } = this.context;

    fetch("http://localhost:3000/games", {
      method: "POST",
      body: fd,
      headers: {
        "x-auth-token": user.jwt,
      },
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            console.log("Success:", data);
            this.setState({ isRedirected: true, gameId: data._id });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  redirectToGame = () => {
    if (this.state.isRedirected)
      return <Redirect to={"/games/" + this.state.gameId} />;
  };

  render() {
    document.title = "Add game";

    return (
      <>
        <h1 className="add-game__head-line">Add game</h1>
        <div className="add-game__div">
          <div className="add-game__cols-wrapper">
            <div className="add-game__image-upload">
              <label htmlFor="image">
                <img
                  className="image-upload__img"
                  src={defaultImage}
                  alt="default"
                  id="add-game__image"
                  ref={this.imgRef}
                />
              </label>
              <input
                onInput={this.handleFileInput}
                className="image-upload__input"
                type="file"
                id="image"
              />
            </div>
            <div className="add-game__col-form">
              <ul className="add-game__ul">
                <li className="add-game__li">
                  <label className="add-game__label" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="add-game__select"
                    type="text"
                    id="title"
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                  />
                </li>
                <li className="add-game__li">
                  <label className="add-game__label" htmlFor="platform">
                    Platform
                  </label>
                  <select
                    className="add-game__select"
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
                <li className="add-game__li">
                  <label className="add-game__label" htmlFor="genre">
                    Genre
                  </label>
                  <select
                    className="add-game__select"
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
                <li className="add-game__li">
                  <label className="add-game__label" htmlFor="maturity">
                    Maturity rating
                  </label>
                  <select
                    className="add-game__select"
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
                <li className="add-game__li">
                  <label className="add-game__label" htmlFor="price">
                    Price
                  </label>
                  <input
                    className="add-game__select"
                    type="number"
                    id="price"
                    value={this.state.price}
                    onChange={this.handlePriceChange}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="add-game__bottom">
            <div className="add-game__li">
              <label className="add-game__label" htmlFor="desc">
                Description
              </label>
              <textarea
                className="add-game__select"
                id="desc"
                cols="30"
                rows="10"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              ></textarea>
            </div>
            <button
              onClick={this.handleButtonClick}
              className="add-game__button"
              id="add"
            >
              ADD
            </button>
            {this.redirectToGame()}
          </div>
        </div>
      </>
    );
  }
}

AddGame.contextType = userContext;

export default AddGame;
