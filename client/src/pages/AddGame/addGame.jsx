import "./addGame.css";
import React, { Component } from "react";
import defaultImage from "../../assets/images/default-img.png";

class AddGame extends Component {
  constructor() {
    super();
    this.imgRef = React.createRef();
  }

  handleFileInput = (event) => {
    const fr = new FileReader();

    fr.onload = () => {
      this.imgRef.current.src = fr.result;
    };

    fr.readAsDataURL(event.target.files[0]);
  };

  render() {
    document.title = "Add game";

    return (
      <>
        <h1 className="head-line">ADD GAME</h1>
        <form
          method="POST"
          action="/game"
          className="add-area"
          id="myForm"
          enctype="multipart/form-data"
        >
          <div className="cols-wrapper-add">
            <div className="image-upload">
              <label for="image">
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
                  <label className="filter-label" for="title">
                    Title
                  </label>
                  <input
                    className="filter-select"
                    type="text"
                    name="title"
                    id="title"
                  />
                </li>
                <li className="filters-list-item">
                  <label className="filter-label" for="platform">
                    Platform
                  </label>
                  <select
                    className="filter-select"
                    name="platform"
                    id="platform"
                  >
                    <option value="PC">PC</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Playstation">Playstation</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                  </select>
                </li>
                <li className="filters-list-item">
                  <label className="filter-label" for="genre">
                    Genre
                  </label>
                  <select className="filter-select" name="genre" id="genre">
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
                  <label className="filter-label" for="maturity">
                    Maturity rating
                  </label>
                  <select
                    className="filter-select"
                    name="maturity"
                    id="maturity"
                  >
                    <option value="4">4+</option>
                    <option value="12">12+</option>
                    <option value="16">16+</option>
                    <option value="18">18+</option>
                  </select>
                </li>
                <li className="filters-list-item">
                  <label className="filter-label" for="price">
                    Price
                  </label>
                  <input
                    className="filter-select"
                    type="number"
                    name="price"
                    id="price"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="add-bottom">
            <div className="filters-list-item">
              <label className="filter-label" for="desc">
                Description
              </label>
              <textarea
                className="filter-select"
                name="desc"
                id="desc"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <input className="add-button" type="submit" value="ADD" id="add" />
          </div>
        </form>
      </>
    );
  }
}

export default AddGame;
