import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { editData } from '../../../../services/api.js';
import style from "./editUserForm.module.css";

function UserEditForm({ initialData, onSubmitSuccess }) {

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [inputs, setInputs] = useState({
    email: initialData ? initialData.email : '',
    firstName: initialData ? initialData.firstName : '',
    lastName: initialData ? initialData.lastName : '',
    birthDate: initialData ? initialData.birthDate : '',
    phone: initialData ? initialData.phone : '',
    handicap: initialData ? initialData.handicap : '',
  });

  const { email, firstName, lastName, birthDate, phone, handicap } = inputs;
  const userId = useSelector((state) => state.user.infos.id);

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
        email,
        firstName,
        lastName,
        birthDate,
        phone,
        handicap,
        userId,
      };

      formData.id = initialData.id;
      await editData("/user", formData);

      setSubmitSuccess(true);
      onSubmitSuccess();

    } catch (error) {
    }
  };

  const isActive = (field) => {
    return inputs[field] !== "";
  };

  return (
    <>
      <h2>Édition de l'utilisateur</h2>
      <form className={style.editUserForm} onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <label htmlFor="email" className={`${style.addForm_label} ${isActive("email") ? style.active : ""}`}>Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            className={style.addForm_input}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="firstName" className={`${style.addForm_label} ${isActive("firstName") ? style.active : ""}`}>Prénom</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            className={style.addForm_input}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="lastName" className={`${style.addForm_label} ${isActive("lastName") ? style.active : ""}`}>Nom</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            className={style.addForm_input}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="birthDate" >Date d'anniversaire</label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            value={birthDate}
            className={style.signForm_input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="phone">Numéro de téléphone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={phone}
            className={style.signForm_input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
            pattern="^(?:0\d\s?){1}\d{2}(?:\s?\d{2}){3}$"
            placeholder="06 00 00 00 00"
            required
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="handicap" className={style.signForm_label}>Handicap</label>
          <input
            type="text"
            name="handicap"
            id="handicap"
            value={handicap}
            className={style.signForm_input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className={style.submitButton}>
          Modifier l'utilisateur
        </button>
        {
          submitSuccess && (
            <div className={style.successMessage}>
              L'utilisateur a été modifié avec succès.
            </div>
          )}
      </form>
    </>
  );
}

export default UserEditForm;