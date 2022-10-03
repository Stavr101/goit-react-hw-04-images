import React, { Component } from 'react';
import axios from 'axios';
// import Button from './Button';
// import { getImages } from 'components/services/imageApi';

export default class SearchGallery extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    name: '',
    page: 1,
    BASE_URL: `https://pixabay.com/api/`,
    API_KEY: `29154782-64abcd202d8466e583ce5ca87`,
  };

  fetchPost() {
    const { page, name, BASE_URL, API_KEY } = this.state;
    this.setState({ loading: true });

    axios
      .get(
        `${BASE_URL}?q=${name}&${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(({ data }) => {
        this.setState(({ items }) => {
          console.log(data);
          return { items: [...items, ...data.hits] };
        });
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ loading: false }));
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.fetchPost();
  };

  render() {
    const { items, loading, error, name } = this.state;

    const { onChange, handleSubmit } = this;
    return (
      <div>
        <header className="searchbar">
          <form className="form">
            <button type="submit" className="button" onClick={handleSubmit}>
              <span className="button-label">Search</span>
            </button>

            <input
              className="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={onChange}
            />
          </form>
        </header>
      </div>
    );
  }
}
