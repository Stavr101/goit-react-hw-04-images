import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import css from '../../../styles.module.css';

export default function ImageGallery({ items, onClick }) {
  // console.log(items);
  return (
    <ul className={css.ImageGallery}>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          onClick={onClick}
          webformatURL={item.webformatURL}
          largeImageURL={item.largeImageURL}
          tags={item.tags}
        />
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  items: PropTypes.array,
  onclick: PropTypes.func,
};
