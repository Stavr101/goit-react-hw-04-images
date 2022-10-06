import React, { Component } from 'react';
import css from '../../styles.module.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Loader from 'shared/components/Loader/Loader';
import Modal from './Modal';
import Button from './Button';

export default class SearchGallery extends Component {
  state = {
    BASE_URL: `https://pixabay.com/api/`,
    API_KEY: `29154782-64abcd202d8466e583ce5ca87`,
    items: [],
    loading: false,
    error: null,
    name: '',
    page: 1,
    modalOpen: false,
    modalContent: {
      largeImageURL: '',
      tags: '',
    },
  };

  componentDidUpdate(_, prevState) {
    const { name, page } = this.state;
    if ((name && prevState.name !== name) || page > prevState.page) {
      this.fetchImage();
    }
  }

  fetchImage() {
    const { page, name, BASE_URL, API_KEY } = this.state;
    this.setState({ loading: true });

    axios
      .get(
        `${BASE_URL}?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(({ data }) => {
        this.setState(({ items }) => {
          return { items: [...items, ...data.hits] };
        });
        this.setState({ name: '' });
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => this.setState({ loading: false }));
  }

  loadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  onSearch = ({ name }) => {
    this.setState({ name });
  };

  openModal = modalContent => {
    this.setState({
      modalOpen: true,
      modalContent,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      modalContent: {
        largeImageURL: '',
        tags: '',
      },
    });
  };

  render() {
    const { items, error, loading, modalOpen, modalContent } = this.state;
    const isPosts = Boolean(items.length);
    const { loadMore } = this;

    const { onSearch, openModal, closeModal } = this;
    return (
      <div className={css.App}>
        <SearchBar onSubmit={onSearch} />

        {loading && <Loader />}
        {error && <p>Спробуйте пізніше.... </p>}
        {isPosts && <ImageGallery items={items} onClick={openModal} />}
        {modalOpen && (
          <Modal onClose={closeModal}>
            <img src={modalContent.largeImageURL} alt={modalContent.tags} />
          </Modal>
        )}
        {isPosts && <Button onClick={loadMore} />}
      </div>
    );
  }
}
