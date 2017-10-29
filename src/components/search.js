import React, { Component } from 'react';
import './search.css';
import './dropdown.css';


class SearchBar extends Component {

  onInputChange(e) {
    e.preventDefault();
    this.props.gameSearch(e.target.value);
  }

  handleChange(e) {
    e.preventDefault();
    console.log(e.target.value)
    this.props.gameFilter(e.target.value);
  }

  render() {
    return (
      <ul>
        <li className="search input-wrapper">
          <input onChange={event => this.onInputChange(event)} type="search" placeholder="Search by Game Name" />
          <label aria-hidden="true" className="fa fa-search input-icon"></label>
        </li>
        <li className="custom-dropdown">
          <select onChange={event => this.handleChange(event)}>
            <option value="All">All</option>
            <option value="Macintosh">Macintosh</option>
            <option value="PlayStation 3">PlayStation 3</option>  
            <option value="Xbox 360">Xbox 360</option>
            <option value="iPad">IPad</option>
            <option value="PlayStation Vita">PlayStation Vita</option>
            <option value="PC">PC</option>
            <option value="iPhone">IPhone</option>
            <option value="Nintendo 3DS">Nintendo 3DS</option>
            <option value="Nintendo DS">Nintendo DS</option>
            <option value="Android">Android</option>
          </select>
        </li>
      </ul>
    );
  }
}

export default SearchBar;
