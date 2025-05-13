import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import ImageGallery from './ImageGallery/ImageGallery'
import SearchBar from './SearchBar/SearchBar'
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn'
import ImageModal from './ImageModal/ImageModal'
import Loader from './Loader/Loader'
import ErrorMessage from './ErrorMessage/ErrorMessage'


export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [newImages, setNewImages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  function openModal(imageUrl) {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSearch = (searchImage) => {
    setNewImages(searchImage);
    setCurrentPage(1);
    setImages([]);
  }

  const incrementPage = () => {
    setCurrentPage(currentPage + 1)
  }

  useEffect(() => {
    if (newImages === "") {
      return;
    }

    async function fetchData () {
      try {
      setIsError(false);
      setIsLoading(true);
      const response = await axios.get(`https://api.unsplash.com/search/photos?orientation=landscape&query=${newImages}&per_page=20&page=${currentPage}&client_id=cBBnwbD5wpzxm6ywVyoTQvzfHHdG4tfE2bLgX1r6v2Y`);
        setImages((prevImages) => [...prevImages, ...response.data.results]);
        setTotalPages(response.data.total_pages);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
    }

    fetchData (newImages, currentPage)

}, [newImages, currentPage])

  return (
    <>
    <div className='container'>
        <SearchBar onSearch={handleSearch} />
        {isError && <ErrorMessage/>}
        <ImageModal isOpen={modalIsOpen} onClose={closeModal} imageUrl={selectedImage} />
        {images.length > 0 && <ImageGallery photos={images} onImageClick={openModal} />}
        {isLoading && <Loader/>}
        {images.length > 0 && !isLoading && currentPage !== totalPages && <LoadMoreBtn nextPage={incrementPage} />}
    </div>
    </>
  );
};