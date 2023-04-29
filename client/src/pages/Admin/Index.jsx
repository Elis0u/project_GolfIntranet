import React, { useEffect, useState, useCallback } from 'react';
import style from "./admin.module.css";
import DataTable from './Components/DataTable';
import { getDatas, deleteData } from '../../services/api.js';
import Modal from 'react-modal';
import DeleteModal from './Components/Modal/DeleteModal';
import ViewModal from './Components/Modal/ViewModal';
import FormModal from './Components/Modal/FormModal';
import loader from '../../assets/img/loader.svg';
import { Helmet } from 'react-helmet';

Modal.setAppElement('#root');

const Admin = () => {
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState({ name: 'Documents', url: '/documents' });
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigationItems = [
    { name: 'Documents', url: '/documents' },
    { name: 'Catégories Documents', url: '/categoriesDocument' },
    { name: 'Evènements', url: '/events' },
    { name: 'Catégories Evènements', url: '/categoriesEvent' },
    { name: 'Utilisateurs', url: '/user' },
  ];

  // function to create the table columns according to the selected navigation and retrieve data | it will be called each time the user changes navigation item
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getDatas(activeNavItem.url);
      setData(response.data.result);

      if (response.data.result.length > 0) {
        const firstObject = response.data.result[0];
        const newColumns = Object.keys(firstObject).map((key) => ({ key, header: key.toUpperCase() }));
        setColumns(newColumns);
      }
    } catch (err) {
    }
    setIsLoading(false);
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

  /* ====================================================== */
  /* =================== MODAL MANAGEMENT ================= */
  /* ====================================================== */
  const openDeleteModal = (data) => {
    setSelectedData(data);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedData(null);
    setDeleteModalIsOpen(false);
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

  const handleView = (data) => {
    openViewModal(data);
  };

  const handleUpdate = (data) => {
    setInitialData(data);
    setIsEditMode(true);
    openFormModal();
  };

  const handleDelete = async () => {
    try {
      await deleteData(activeNavItem.url, selectedData.id);
      fetchData();
      closeDeleteModal();
    } catch (error) {
    }
  };

  // Form submit
  const handleFormSubmitSuccess = () => {
    fetchData();
    closeFormModal();
  };

  return (
    <>
      <Helmet>
        <title>Admin - Equipe femme de Granville</title>
      </Helmet>

      <main className={style.ctnAdmin}>
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
        {isLoading && (
          <div className={style.loaderContainer}>
            <img src={loader} alt="Chargement..." className={style.loader} />
          </div>
        )}
        {!isLoading && columns && data && (
          <DataTable
            columns={columns}
            data={data}
            onView={handleView}
            onUpdate={handleUpdate}
            onDelete={openDeleteModal}
            onDataUpdated={handleDataUpdated}
          />
        )}
        <DeleteModal
          deleteModalIsOpen={deleteModalIsOpen}
          closeDeleteModal={closeDeleteModal}
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
    </>
  );
}

export default Admin;