import React, {useEffect} from 'react'
import style from './Modal.module.css'
import PropTypes from 'prop-types';

export default function Modal({data, onClose}) {
  
  
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  console.log(data);

  return (
    <div className={style.Overlay} onClick={onClose}>
  <div className={style.Modal}>
    <img src={data} alt={data} />
  </div>
</div>
  )
}

Modal.propTypes = {
  data: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

  