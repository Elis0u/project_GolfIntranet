import React from 'react';
import DocumentForm from './Form/DocumentForm';

const DynamicForm = ({ activeNavItem, isEditMode, initialData, onSubmitSuccess }) => {
  const renderForm = () => {
    switch (activeNavItem.name) {
      case 'Documents':
        return <DocumentForm isEditMode={isEditMode} initialData={initialData} onSubmitSuccess={onSubmitSuccess} />;
        break;
      case 'Evènements':
        console.log("Formulaire event")
        break;
      default:
        return <p>Veuillez sélectionner une catégorie valide.</p>;
    }
  };

  return <div>{renderForm()}</div>;
};

export default DynamicForm;