import { useEffect } from 'react';
import s from "../Modal/Modal.module.css";


export function Modal ({onClose, largeImg}) {
  useEffect(() => {
    const handleKeyDown= (e)=> {
    if (e.code === "Escape") {
      onClose();
    }
  };
    window.addEventListener("keydown", handleKeyDown);
    return () => { window.removeEventListener("keydown", handleKeyDown) };
  }, [onClose]);
  
  const handleForCloseModal = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };  
    return (<div className={s.overlay} onClick={handleForCloseModal}>
        <div className={s.modal}>
          <img src={largeImg} alt="photoImg" />
        </div>
      </div>);
};

  