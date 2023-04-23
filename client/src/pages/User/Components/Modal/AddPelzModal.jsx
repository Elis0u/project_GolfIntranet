import React from 'react';
import Modal from 'react-modal';
// import { useSelector } from "react-redux";
import style from '../../accountPage.module.css';
import PelzForm from '../Form/AddPelzForm';

function FormPelzModal({ formModalIsOpen, closeFormModal, handleFormSubmitSuccess }) {
//   const user = useSelector((state) => state.user.infos);
//   const key = user.id;
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
        // key={key}
      />
      <div className={style.modalActions}>
        <button onClick={closeFormModal}>Annuler</button>
      </div>
    </Modal>
  );
}

export default FormPelzModal;