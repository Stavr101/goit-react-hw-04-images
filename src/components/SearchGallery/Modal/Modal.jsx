import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from '../../../styles.module.css';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ children, onClose }) {
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}
