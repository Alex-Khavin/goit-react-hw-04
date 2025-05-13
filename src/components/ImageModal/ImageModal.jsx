import css from './ImageModal.module.css'
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function ImageModal({ isOpen, onClose, imageUrl }) {
    return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Image modal"
    className={css.modal}
    overlayClassName={css.overlay}
    shouldCloseOnOverlayClick={true}
    preventScroll={false}
    >
      {imageUrl && <img src={imageUrl} alt="Large view" />}
    </Modal>
    )
}