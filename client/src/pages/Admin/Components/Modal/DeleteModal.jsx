import React from 'react';
import Modal from 'react-modal';
import style from '../../admin.module.css';

const DeleteModal = ({ modalIsOpen, closeModal, handleDelete }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Suppression de l'élément"
      className={style.modalContentDelete}
      overlayClassName={style.modalOverlay}
      role="dialog"
      aria-modal="true"
    >
      <h2>Confirmation de la suppression</h2>
      <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
      <div className={style.modalActions}>
        <button onClick={closeModal}>Annuler</button>
        <button onClick={handleDelete} className={style.deleteButton}>
          Supprimer
        </button>
      </div>
    </Modal>
  );
}

export default DeleteModal;