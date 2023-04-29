import React from 'react';
import Modal from 'react-modal';
import style from '../../admin.module.css';

const DeleteModal = ({ deleteModalIsOpen, closeDeleteModal, handleDelete }) => {
  return (
    <Modal
      isOpen={deleteModalIsOpen}
      onRequestClose={closeDeleteModal}
      contentLabel="Suppression de l'élément"
      className={style.modalContentDelete}
      overlayClassName={style.modalOverlay}
      role="dialog"
      aria-modal="true"
    >
      <h2>Confirmation de la suppression</h2>
      <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
      <div className={style.modalActions}>
        <button onClick={closeDeleteModal}>Annuler</button>
        <button onClick={handleDelete} className={style.deleteButton}>
          Supprimer
        </button>
      </div>
    </Modal>
  );
}

export default DeleteModal;