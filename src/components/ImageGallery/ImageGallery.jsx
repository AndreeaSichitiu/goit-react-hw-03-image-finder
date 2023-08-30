import React from 'react';
import style from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={style.ImageGallery}>
      {images.map(img => (
        <ImageGalleryItem
          key={img.id}
          image={img}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  onImageClick: PropTypes.func.isRequired,

}