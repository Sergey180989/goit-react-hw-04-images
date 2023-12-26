import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import s from '../components/App.module.css';

const findImage = (imgName, page) => {
    const API_KEY = '25728701-c83c0487db4f1d7b899af3be5';
  const API_GET = 'https://pixabay.com/api/?';   
   return fetch(
      `${API_GET}q=${imgName}&key=${API_KEY}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`Not found ${imgName}`)
        );
      })      
  };

export function App () {  
  const [imgName, setImgName] = useState("");
  const [page, setPage] = useState(1);
  const [imgArray, setImgArray] = useState(null);
  const [largeImg, setLargeImg] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    if (!imgName) return;

    setStatus('pending');

    findImage(imgName, page)
        .then(res => {
            const makeArr = res.hits.map(({ id, webformatURL, largeImageURL }) => ({
                id,
                webformatURL,
                largeImageURL
            }));
            if (page !== 1) {
                if (res.total && res.hits.length !== 0) {
                    setImgArray(prevArray => [...prevArray, ...makeArr]);  
                    setStatus("resolved");
                } else {
                    setStatus('resolveWithoutButton');
                }
            } else {
                setImgArray(makeArr);
                setStatus('resolved');
            }
        })
        .catch(err => {
            setError(err.message);
            setStatus('rejected');
        });
}, [imgName, page, setImgArray]);   
  const submitHandler = value => {
    setImgName(value);
    setPage(1);      
  };
  const handleButton = () => {    
    setStatus('pending');    
    setPage(page + 1);         
  };
  const handleForModal = e => {
    setLargeImg(e.target.alt);
    setShowModal(!showModal);
  };
  const toggleModal = () => {
    setShowModal(!showModal)
  }
      if (status === 'idle') {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={submitHandler} />
        </div>
      );
    }
    if (status === 'pending') {      
      return (
        <div className={s.app}>
          <Searchbar onSubmit={submitHandler} />
          {imgArray&&<ImageGallery array={imgArray} onClick={handleForModal} />}
          <Loader />
          <p style={{ textAlign: 'center', fontSize: 30 }}>Loading...</p>
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={submitHandler} />
          <p style={{ textAlign: 'center', fontSize: 30 }}>{error}</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={submitHandler} />
          <ImageGallery array={imgArray} onClick={handleForModal} />
          {imgArray && <Button handleButton={handleButton} />}
          {showModal &&<Modal largeImg={largeImg} onClose={toggleModal} />}
        </div>
      );
    }
    if (status === 'resolveWithoutButton') {
      return (
        <div className={s.app}>
          <Searchbar onSubmit={submitHandler} />
          <ImageGallery array={imgArray} onClick={handleForModal} />
          <p style={{ textAlign: 'center', fontSize: 30 }}>All images found!</p>
          {showModal &&<Modal largeImg={largeImg} onClose={toggleModal} />}
        </div>
      );
    }
  }
export default App;