import React, { useState } from 'react';
import { addData, editData } from '../../../../services/api.js';
import style from "./addForm.module.css";

function CategoriesForm({ isEditMode = false, initialData, onSubmitSuccess, url }) {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [inputs, setInputs] = useState({
    title: isEditMode && initialData ? initialData.title : '',
  });

  const { title } = inputs;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleFocus = (e) => {
    const label = e.target.previousElementSibling;
    label.classList.add(style.active);
  };

  const handleBlur = (e) => {
    const label = e.target.previousElementSibling;
    if (e.target.value === '') {
      label.classList.remove(style.active);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = {
        title,
      };
  
      if (isEditMode && initialData) {
        formData.id = initialData.id;
        await editData(url, formData);
        console.log('Catégorie modifiée avec succès');
      } else {
        console.log(formData);
        await addData(url, formData);
        console.log('Catégorie ajoutée avec succès');
      }
  
      setSubmitSuccess(true);
      onSubmitSuccess();
  
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la categorie:', error);
    }
  };

  return (
    <>
      {isEditMode ? (
        <h2>Edit de la categorie</h2>
      ) : (
        <h2>Ajout d'une categorie</h2>
      )}
      <form className={style.addForm} onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <label htmlFor="title" className={style.addForm_label}>Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            className={style.addForm_input}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>
        <button type="submit" className={style.submitButton}>
          {isEditMode ? 'Modifier la categorie' : 'Ajouter la categorie'}
        </button>
        {
          submitSuccess && (
            <div className={style.successMessage}>
              {isEditMode ? 'La categories a été modifiée avec succès.' : 'La categories a été ajoutée avec succès.'}
            </div>
          )}
      </form>
    </>
  );
}

export default CategoriesForm;