// import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'shared/components/Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button.jsx';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import css from '../../styles.module.css';
import { useEffect, useState } from 'react';

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `29154782-64abcd202d8466e583ce5ca87`;

export default function SearchGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  // console.log(name);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const isPosts = Boolean(items.length);

  // let firstRender = true;

  useEffect(() => {
    // if (firstRender) {
    // return (firstRender = false);
    console.log('start');

    fetchImage();

    // fetchImage();
  }, [name, page]);

  const fetchImage = () => {
    setLoading(true);

    axios
      .get(
        `${BASE_URL}?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(({ data }) => {
        setItems(prevItems => {
          return [...prevItems, ...data.hits];
        });
        setName('');
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSearch = ({ name }) => {
    setName(name);
  };

  const openModal = modalContent => {
    setModalOpen(true);
    setLargeImageURL();
    setTags();
  };

  const closeModal = () => {
    setModalOpen(false);
    setLargeImageURL('');
    setTags('');
  };
  return (
    <div className={css.App}>
      <SearchBar onSubmit={onSearch} />

      {loading && <Loader />}
      {error && <p>Спробуйте пізніше.... </p>}
      {isPosts && <ImageGallery items={items} onClick={openModal} />}
      {modalOpen && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
      {isPosts && <Button onClick={loadMore} />}
    </div>
  );
}

// export default class SearchGallery extends Component {
//   static BASE_URL = `https://pixabay.com/api/`;
//   static API_KEY = `29154782-64abcd202d8466e583ce5ca87`;

//   state = {
//     // BASE_URL: `https://pixabay.com/api/`,
//     // API_KEY: `29154782-64abcd202d8466e583ce5ca87`,
//     items: [],
//     loading: false,
//     error: null,
//     name: '',
//     page: 1,
//     modalOpen: false,
//     modalContent: {
//       largeImageURL: '',
//       tags: '',
//     },
//   };

//   componentDidUpdate(_, prevState) {
//     const { name, page } = this.state;
//     if ((name && prevState.name !== name) || page > prevState.page) {
//       this.fetchImage();
//     }
//   }

//   fetchImage() {
//     const { page, name } = this.state;
//     this.setState({ loading: true });

//     axios
//       .get(
//         `${SearchGallery.BASE_URL}?q=${name}&page=${page}&key=${SearchGallery.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//       )
//       .then(({ data }) => {
//         this.setState(({ items }) => {
//           return { items: [...items, ...data.hits] };
//         });
//         this.setState({ name: '' });
//       })
//       .catch(error => {
//         this.setState({ error });
//       })
//       .finally(() => this.setState({ loading: false }));
//   }

//   loadMore = () => {
//     this.setState(({ page }) => {
//       return {
//         page: page + 1,
//       };
//     });
//   };

//   onSearch = ({ name }) => {
//     this.setState({ name });
//   };

//   openModal = modalContent => {
//     this.setState({
//       modalOpen: true,
//       modalContent,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       modalOpen: false,
//       modalContent: {
//         largeImageURL: '',
//         tags: '',
//       },
//     });
//   };

//   render() {
//     const { items, error, loading, modalOpen, modalContent } = this.state;
//     const isPosts = Boolean(items.length);
//     const { loadMore } = this;

//     const { onSearch, openModal, closeModal } = this;
//     return (
//       <div className={css.App}>
//         <SearchBar onSubmit={onSearch} />

//         {loading && <Loader />}
//         {error && <p>Спробуйте пізніше.... </p>}
//         {isPosts && <ImageGallery items={items} onClick={openModal} />}
//         {modalOpen && (
//           <Modal onClose={closeModal}>
//             <img src={modalContent.largeImageURL} alt={modalContent.tags} />
//           </Modal>
//         )}
//         {isPosts && <Button onClick={loadMore} />}
//       </div>
//     );
//   }
// }
