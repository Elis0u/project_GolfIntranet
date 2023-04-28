import React from 'react';
import Modal from 'react-modal';
import style from '../../admin.module.css';

const ViewModal = ({ viewModalIsOpen, closeViewModal, selectedData }) => {
    return (
        <Modal
            isOpen={viewModalIsOpen}
            onRequestClose={closeViewModal}
            contentLabel="Visualisation de l'élément"
            className={style.modalContentView}
            overlayClassName={style.modalOverlay}
            role="dialog"
            aria-modal="true"
        >
            {selectedData && (
                <>
                    <h2>Détail de l'élément</h2>
                    {Object.entries(selectedData).map(([key, value], index) => (
                        <dl key={index} className={style.elementContent}>

                            <dt><strong>{key}:</strong></dt>
                            {key === "createdAt" || key === "updatedAt" || key === "startEvent" || key === "endEvent" || key === "birthDate" ? 
                                <dd>{new Date(value).toLocaleDateString()} - {new Date(value).toLocaleTimeString()}</dd> 
                                : <dd>{value}</dd>
                            }
                        </dl>
                    ))}
                </>
            )}
            <div className={style.modalActions}>
                <button onClick={closeViewModal}>Fermer</button>
            </div>
        </Modal>
    );
}

export default ViewModal;