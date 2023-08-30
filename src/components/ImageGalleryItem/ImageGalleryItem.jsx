import React from 'react';
import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image, onImageClick }) {
  return (
    <li className={style.ImageGalleryItem} onClick={() => onImageClick(image)}>
      <img
        className={style.ImageGalleryItem__image}
        src={image.webformatURL}
        alt=""
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  onImageClick: PropTypes.func.isRequired,
};
