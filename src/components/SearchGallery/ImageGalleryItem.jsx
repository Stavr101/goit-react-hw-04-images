import React from 'react';
import css from '../../styles.module.css';

export default function ImageGalleryItem({ items, onClick }) {
  // console.log(items);
  const elements = items.map(({ webformatURL, largeImageURL, id, tags }) => (
    <li
      key={id}
      onClick={() => onClick({ largeImageURL })}
      className={css.ImageGalleryItem}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItem_image}
      />
    </li>
  ));

  return elements;
}
