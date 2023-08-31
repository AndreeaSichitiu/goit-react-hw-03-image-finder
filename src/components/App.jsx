import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import style from './App.module.css';

import { useState } from 'react';
import { resourseApi } from 'api/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFormSubmit = async query => {
    setSearchQuery(query);
    if (query === '') {
      Notify.info('You cannot search by empty field, try again.', {
        position: 'center-center',
      });
      return;
    } else {
      try {
        const response = await resourseApi.search(query);
        if (response.data.totalHits === 0) {
          Notify.info(
            'Sorry, there are no images matching your search. Please try again.',
            {
              position: 'center-center',
            }
          );
        } else {
          Notify.info(`We found ${response.data.totalHits} images.`);
        }
        setImages(response.data.hits);
      } catch (error) {
        console.error('Error Status:', error.response.status);
      }
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);

    try {
      const response = await resourseApi.search(searchQuery, page + 1);
      setImages(prevImages => [...prevImages, ...response.data.hits]);
      setPage(prevPage => prevPage + 1);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching more images:', error);
      setIsLoading(false);
    }
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    console.log('Image clicked:', image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery images={images} onImageClick={handleImageClick} />

      {isLoading && <Loader />}

      {images.length > 0 && !isLoading && (
        <Button onLoadMore={handleLoadMore} />
      )}

      {selectedImage && (
        <Modal data={selectedImage.largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
};
