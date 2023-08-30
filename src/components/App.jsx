
import Searchbar from "./Searchbar/Searchbar";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import style from "./App.module.css"

import { useState } from "react";
import { resourseApi } from "api/api";


export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearchSubmit = async query => {
    setSearchQuery(query);
    try {
      const response = await resourseApi.search(query);
      setImages(response.data.hits);
    } catch (error) {
      if (error.response) {
        console.error('Error Status:', error.response.status);
        console.error('Error Data:', error.response.data);
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('General Error:', error.message);
      }
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);

    try {
      const response = await resourseApi.search(searchQuery, page + 1);
      setImages(prevImages => [...prevImages, ...response.data.hits]);
      setPage(prevPage => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching more images:', error);
      setLoading(false);
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
      <Searchbar onSubmit={handleSearchSubmit} />
       
      <ImageGallery images={images} onImageClick={handleImageClick} />

      {loading && <Loader />}

      {images.length > 0 && !loading && <Button onLoadMore={handleLoadMore} />}

      {selectedImage && (
        <Modal
          data={resourseApi.largeImageURL}
          onClose={closeModal}
        />
      )}
    </div>
  );
};