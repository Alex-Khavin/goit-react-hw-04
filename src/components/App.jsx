import { useState, useEffect } from 'react';
import axios from 'axios';
import { GridLoader } from "react-spinners";
import { IoSearch } from "react-icons/io5";
import './App.css'
import ImageGallery from './ImageGallery/ImageGallery'
import SearchBar from './SearchBar/SearchBar'
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [newImages, setNewImages] = useState("");
  const [carrentPage, setCarrentPage] = useState(1);
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
    setCarrentPage(1);
    setImages([]);
  }

  const incrementPage = () => {
    setCarrentPage(carrentPage + 1)
  }

  useEffect(() => {
    if (newImages === "") {
      return;
    }

    async function fetchData () {
      try {
      setIsError(false);
      setIsLoading(true);
      const response = await axios.get(`https://api.unsplash.com/search/photos?orientation=landscape&query=${newImages}&per_page=20&page=${carrentPage}&client_id=cBBnwbD5wpzxm6ywVyoTQvzfHHdG4tfE2bLgX1r6v2Y`);
        setImages((prevImages) => [...prevImages, ...response.data.results]);
        setTotalPages(response.data.total_pages);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
    }

    fetchData (newImages, carrentPage)

}, [newImages, carrentPage])

  return (
    <>
    <div className='container'>
        <SearchBar onSearch={handleSearch} />
        {isError && <strong className='error'>Error! Try again!</strong>}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image modal"
          className="modal"
          overlayClassName="overlay"
          shouldCloseOnOverlayClick={true}
          preventScroll={false}
        >
          {selectedImage && <img src={selectedImage} alt="Large view" />}
        </Modal>
        {images.length > 0 && <ImageGallery photos={images} onImageClick={openModal} />}
        {isLoading && <p className='loader'><GridLoader size={10} color={"#1853ec"} /></p>}
        {images.length > 0 && !isLoading && carrentPage !== totalPages && <button onClick={incrementPage} className='btn'><IoSearch />Load more</button>}
    </div>
    </>
  );
};