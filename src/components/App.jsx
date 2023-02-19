import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { galleryImageDataFetch } from '../services/galleryImages';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // const perPage = 12;

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };
  const handleClickBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const result = await galleryImageDataFetch(query, page);
        setImages(prevImages => [...prevImages, ...result]);
      } catch {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (query !== '') {
      fetchImages();
    }
  }, [query, page, error]);

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <div>
        {loading && <Loader />}
        <ImageGallery images={images} />
      </div>

      <Button handleClickBtn={handleClickBtn} />
    </div>
  );
};
