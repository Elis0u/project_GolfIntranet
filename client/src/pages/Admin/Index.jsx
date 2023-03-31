import React, { useEffect, useState, useCallback } from 'react';
import style from "./admin.module.css";
import DataTable from './Components/DataTable';
import { getDatas, deleteData } from '../../services/api.js';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Remplacez '#root' par l'ID de l'élément racine de votre application

function Admin() {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState({ name: 'Documents', url: '/documents' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const navigationItems = [
    { name: 'Documents', url: '/documents' },
    { name: 'Catégories Documents', url: '/categoriesdocument' },
    { name: 'Evènements', url: '/events' },
    { name: 'Catégories Evènements', url: '/categoriesevent' },
    { name: 'Utilisateurs', url: '/user' },
  ];

  const fetchData = useCallback(async () => {
    try {
      const response = await getDatas(activeNavItem.url);
      setData(response.data.result);

      // Créer les colonnes à partir du premier objet du tableau
      if (response.data.result.length > 0) {
        const firstObject = response.data.result[0];
        const newColumns = Object.keys(firstObject).map((key) => ({ key, header: key.toUpperCase() }));
        setColumns(newColumns);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }, [activeNavItem]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  const handleView = (data) => {
    console.log('View:', data);
  };

  const handleUpdate = (data) => {
    console.log('Update:', data);
  };

  const openModal = (data) => {
    setSelectedData(data);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedData(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteData(activeNavItem.url, selectedData.id);
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <main className={style.adminContainer}>
      <h2>Admin Panel</h2>
      <nav>
        <ul className={style.adminNav}>
          {navigationItems.map((navItem, index) => (
            <li key={index} className={navItem.name === activeNavItem.name ? style.activeNavItem : ''} onClick={() => handleNavItemClick(navItem)}>
              {navItem.name}
            </li>
          ))}
        </ul>
      </nav>
      {columns && data && <DataTable
        columns={columns}
        data={data}
        onView={handleView}
        onUpdate={handleUpdate}
        onDelete={openModal}
      />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Suppression de l'élément"
        className={style.modalContent}
        overlayClassName={style.modalOverlay}
      >
        <h2>Confirmation de la suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
        <div className={style.modalActions}>
          <button onClick={closeModal}>Annuler</button>
          <button onClick={handleDelete} className={style.deleteButton}>Supprimer</button>
        </div>
      </Modal>
    </main>
  );
}

export default Admin;