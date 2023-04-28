import React from 'react';
import Modal from 'react-modal';
import style from '../../accountPage.module.css';
import PelzForm from '../Form/AddPelzForm';

const FormPelzModal = ({ formModalIsOpen, closeFormModal, handleFormSubmitSuccess }) => {

  return (
    <Modal
      isOpen={formModalIsOpen}
      onRequestClose={closeFormModal}
      contentLabel="Ajout d'un score de pelz"
      className={style.modalContentForm}
      overlayClassName={style.modalOverlay}
      role="dialog"
      aria-modal="true"
    >

    <PelzForm
      onSubmitSuccess={handleFormSubmitSuccess}
    />
    
    <div className={style.modalActions}>
      <button onClick={closeFormModal}>Annuler</button>
    </div>
    </Modal>
  );
}

export default FormPelzModal;