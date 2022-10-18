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

  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const isPosts = Boolean(items.length);

  useEffect(() => {
    setItems([]);
  }, [name]);

  useEffect(() => {
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
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => setLoading(false));
    };

    fetchImage();
  }, [name, page]);

  const onSearch = ({ name }) => {
    setName(name);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = modalContent => {
    console.log(modalContent);
    setModalOpen(true);
    setLargeImageURL(modalContent.largeImageURL);
    setTags(modalContent.tags);
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
