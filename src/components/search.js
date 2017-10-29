import React, { Component } from 'react';
import './search.css';

class SearchBar extends Component {

  onInputChange(e) {
    e.preventDefault();
    if (e.target.value) {
      this.props.gameSearch(e.target.value);
    }
  }

  render() {
    return (
      <div>
        <div className="search input-wrapper">
          <input onChange={event => this.onInputChange(event)} type="search" placeholder="Search by Game Name" />
          <label aria-hidden="true" className="fa fa-search input-icon"></label>
        </div>
        <select className="ui dropdown">
          <option value="">Gender</option>
          <option value="1">Male</option>
          <option value="0">Female</option>
        </select>
      </div>
    );
  }
}

export default SearchBar;
