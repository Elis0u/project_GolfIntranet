import React from 'react';
import Modal from 'react-modal';
import { useSelector } from "react-redux";
import style from '../../accountPage.module.css';
import UserEditForm from '../Form/InformationForm';

function FormModal({ formModalIsOpen, closeFormModal, isEditMode, initialData, handleFormSubmitSuccess }) {
  const user = useSelector((state) => state.user.infos);
  const key = user.id;
  return (
    <Modal
      isOpen={formModalIsOpen}
      onRequestClose={closeFormModal}
      contentLabel="Modifier un utilisateur"
      className={style.modalContentForm}
      overlayClassName={style.modalOverlay}
      role="dialog"
      aria-modal="true"
    >
      <UserEditForm
        isEditMode={isEditMode}
        initialData={initialData}
        onSubmitSuccess={handleFormSubmitSuccess}
        key={key}
      />
      <div className={style.modalActions}>
        <button onClick={closeFormModal}>Annuler</button>
      </div>
    </Modal>
  );
}

export default FormModal;