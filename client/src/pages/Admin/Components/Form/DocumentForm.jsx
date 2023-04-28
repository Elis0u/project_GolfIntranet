import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addData, editData, getDatas } from '../../../../services/api.js';
import style from "./addForm.module.css";

const DocumentForm = ({ isEditMode = false, initialData, onSubmitSuccess }) => {
  const [categories, setCategories] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [inputs, setInputs] = useState({
    title: isEditMode && initialData ? initialData.title : '',
    content: isEditMode && initialData ? initialData.content : '',
    categoryId: isEditMode && initialData ? initialData.categoryId : '',
  });

  const { title, content, categoryId } = inputs;
  const userId = useSelector((state) => state.user.infos.id);

  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await getDatas("/categoriesDocument");
        setCategories(categories.data.result);
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, []);

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
        content,
        categoryId,
        userId,
      };
  
      if (isEditMode && initialData) {
        formData.id = initialData.id;
        await editData("/documents", formData);
      } else {
        await addData("/documents", formData);
      }
  
      setSubmitSuccess(true);
      onSubmitSuccess();
  
    } catch (error) {
    }
  };

  const isActive = (field) => {
    return isEditMode && inputs[field] !== "";
  };

  return (
    <>
      {isEditMode ? (
        <h2>Edit du document</h2>
      ) : (
        <h2>Ajout d'un document</h2>
      )}
      <form className={style.addForm} onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <label htmlFor="title"  className={`${style.addForm_label} ${isActive("title") ? style.active : ""}`}>Titre</label>
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
        <div className={style.inputGroup}>
          <label htmlFor="content" className={`${style.addForm_label} ${isActive("content") ? style.active : ""}`}>Contenu</label>
          <textarea
            name="content"
            id="content"
            value={content}
            className={style.addForm_input}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          ></textarea>
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="categoryId" className={`${style.addForm_label} ${isActive("categoryId") ? style.active : ""}`}>Catégorie</label>
          <select
            name="categoryId"
            id="categoryId"
            value={categoryId}
            className={`${style.addForm_input} ${style.addForm_selectOption}`}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          >
            <option value="" className={style.hiddenOption}></option>
            {categories && categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={style.submitButton}>
          {isEditMode ? 'Modifier le document' : 'Ajouter le document'}
        </button>
        {
          submitSuccess && (
            <div className={style.successMessage}>
              {isEditMode ? 'Le document a été modifié avec succès.' : 'Le document a été ajouté avec succès.'}
            </div>
          )}
      </form>
    </>
  );
}

export default DocumentForm;