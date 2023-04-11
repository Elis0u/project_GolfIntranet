import React from 'react';
import Modal from 'react-modal';
import style from '../../admin.module.css';
import DynamicForm from '../Form';

function FormModal({ formModalIsOpen, closeFormModal, activeNavItem, isEditMode, initialData, handleFormSubmitSuccess }) {
  return (
    <Modal
      isOpen={formModalIsOpen}
      onRequestClose={closeFormModal}
      contentLabel="Ajouter un élément"
      className={style.modalContentForm}
      overlayClassName={style.modalOverlay}
      role="dialog"
      aria-modal="true"
    >
      <DynamicForm
        activeNavItem={activeNavItem}
        isEditMode={isEditMode}
        initialData={initialData}
        onSubmitSuccess={handleFormSubmitSuccess}
      />
      <div className={style.modalActions}>
        <button onClick={closeFormModal}>Annuler</button>
      </div>
    </Modal>
  );
}

export default FormModal;