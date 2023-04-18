import React from 'react';
import DocumentForm from './Form/DocumentForm';
import CategoriesForm from './Form/CategoriesForm';
import EventForm from './Form/EventForm';

const DynamicForm = ({ activeNavItem, isEditMode, initialData, onSubmitSuccess }) => {
  const renderForm = () => {
    switch (activeNavItem.name) {
      case 'Documents':
        return <DocumentForm isEditMode={isEditMode} initialData={initialData} onSubmitSuccess={onSubmitSuccess} />;
      case 'Catégories Documents':
        return <CategoriesForm isEditMode={isEditMode} initialData={initialData} onSubmitSuccess={onSubmitSuccess} url="/categoriesDocument" />;
      case 'Catégories Evènements':
        return <CategoriesForm isEditMode={isEditMode} initialData={initialData} onSubmitSuccess={onSubmitSuccess} url="/categoriesEvent" />;
      case 'Evènements':
        return <EventForm isEditMode={isEditMode} initialData={initialData} onSubmitSuccess={onSubmitSuccess}/>;
      default:
        return <p>Veuillez sélectionner une catégorie valide.</p>;
    }
  };

  return <section>{renderForm()}</section>;
};

export default DynamicForm;