import React, { useEffect, useState, useCallback } from 'react';
import style from "./admin.module.css";
import DataTable from './Components/DataTable';
import { getDatas, deleteData } from '../../services/api.js';
import Modal from 'react-modal';
import DynamicForm from './Components/Form';
import DeleteModal from './Components/Modal/DeleteModal';
import ViewModal from './Components/Modal/ViewModal';
import FormModal from './Components/Modal/FormModal';

Modal.setAppElement('#root');

function Admin() {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState({ name: 'Documents', url: '/documents' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialData, setInitialData] = useState(null);

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

  const handleDataUpdated = (updatedData) => {
    const newData = data.map((row) => (row.id === updatedData.id ? updatedData : row));
    setData(newData);
  };

  const handleView = (data) => {
    openViewModal(data);
  };

  const handleUpdate = (data) => {
    setInitialData(data);
    setIsEditMode(true);
    openFormModal();
  };

  const openModal = (data) => {
    setSelectedData(data);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedData(null);
    setModalIsOpen(false);
  };

  const openViewModal = (data) => {
    setSelectedData(data);
    setViewModalIsOpen(true);
  };

  const closeViewModal = () => {
    setSelectedData(null);
    setViewModalIsOpen(false);
  };

  const openFormModal = () => {
    setFormModalIsOpen(true);
  };

  const closeFormModal = () => {
    setIsEditMode(false);
    setInitialData(null);
    setFormModalIsOpen(false);
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

  const handleFormSubmitSuccess = () => {
    fetchData();
    closeFormModal();
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
      {activeNavItem.name !== 'Utilisateurs' && (
        <button onClick={openFormModal} className={style.addButton}>
          Ajouter un élément
        </button>
      )}
      {columns && data && <DataTable
        columns={columns}
        data={data}
        onView={handleView}
        onUpdate={handleUpdate}
        onDelete={openModal}
        onDataUpdated={handleDataUpdated}
      />}
      <DeleteModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        handleDelete={handleDelete}
      />
      <ViewModal
        viewModalIsOpen={viewModalIsOpen}
        closeViewModal={closeViewModal}
        selectedData={selectedData}
      />
      <FormModal
        formModalIsOpen={formModalIsOpen}
        closeFormModal={closeFormModal}
        activeNavItem={activeNavItem}
        isEditMode={isEditMode}
        initialData={initialData}
        handleFormSubmitSuccess={handleFormSubmitSuccess}
      />
    </main>
  );
}

export default Admin;
