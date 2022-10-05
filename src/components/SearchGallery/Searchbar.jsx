import React, { Component } from 'react';
import css from '../../styles.module.css';
import { ImSearch } from 'react-icons/im';

export default class SearchBar extends Component {
  state = {
    name: '',
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      name: '',
    });
  }
  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm}>
          <button
            type="submit"
            className={css.SearchForm_button}
            onClick={handleSubmit}
          >
            <span className={css.SearchForm_button_label}>Search</span>
            <ImSearch size={20} />
          </button>
          <input
            className={css.SearchForm_input}
            type="text"
            name="name"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}
