import "./filters.css";
import React from "react";

const Filters = () => {
  return (
    <form
      method="GET"
      action="/filter"
      id="filterForm"
      enctype="multipart/form-data"
      className="filters-list"
    >
      <ul className="filters-ul">
        <li className="filters-list-item">
          <label className="filter-label" for="platform">
            Platform
          </label>
          <select className="filter-select" name="platform" id="platform">
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
          <select className="filter-select" name="maturity" id="maturity">
            <option value="4">4+</option>
            <option value="12">12+</option>
            <option value="16">16+</option>
            <option value="18">18+</option>
          </select>
        </li>
      </ul>
      <input className="filter-button" type="submit" value="Apply" />
    </form>
  );
};

export default Filters;
