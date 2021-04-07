import "./addGame.css";
import React, { Component } from "react";
import defaultImage from "../../assets/images/default-img.png";
import { Redirect } from "react-router";

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

    fetch("http://localhost:3000/games", {
      method: "POST",
      body: fd,
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
        <h1 className="head-line">ADD GAME</h1>
        <div className="add-area">
          <div className="cols-wrapper-add">
            <div className="image-upload">
              <label htmlFor="image">
                <img
                  src={defaultImage}
                  alt=""
                  id="image-add"
                  ref={this.imgRef}
                />
              </label>
              <input
                onInput={this.handleFileInput}
                type="file"
                name="image"
                id="image"
              />
            </div>
            <div className="col-title">
              <ul className="add-ul">
                <li className="filters-list-item">
                  <label className="filter-label" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="filter-select"
                    type="text"
                    name="title"
                    id="title"
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                  />
                </li>
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
                <li className="filters-list-item">
                  <label className="filter-label" htmlFor="price">
                    Price
                  </label>
                  <input
                    className="filter-select"
                    type="number"
                    name="price"
                    id="price"
                    value={this.state.price}
                    onChange={this.handlePriceChange}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="add-bottom">
            <div className="filters-list-item">
              <label className="filter-label" htmlFor="desc">
                Description
              </label>
              <textarea
                className="filter-select"
                name="desc"
                id="desc"
                cols="30"
                rows="10"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              ></textarea>
            </div>
            <button
              onClick={this.handleButtonClick}
              className="add-button"
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

export default AddGame;
