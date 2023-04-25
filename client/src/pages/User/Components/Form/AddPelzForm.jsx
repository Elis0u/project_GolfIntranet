import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addData } from '../../../../services/api.js';
import style from "../../accountPage.module.css";

function PelzForm({ onSubmitSuccess }) {

  const user = useSelector((state) => state.user.infos);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [inputs, setInputs] = useState({
    email: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    handicap: '',
  });

  const { score } = inputs;
  const userId = user.id;

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
        score,
        userId,
      };

      await addData("/pelz", formData);

      setSubmitSuccess(true);
      onSubmitSuccess();

    } catch (error) {
    }
  };

  const isActive = (field) => {
    return inputs[field] !== null && inputs[field] !== undefined && inputs[field] !== "";
  };

  return (
    <>
      <h2>Édition de l'utilisateur</h2>
      <form className={style.pelzForm} onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <label htmlFor="score" className={`${style.addForm_label} ${isActive("score") ? style.active : ""}`}>Score</label>
          <input
            type="text"
            name="score"
            id="score"
            value={score}
            className={style.addForm_input}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
        </div>
        <button type="submit" className={style.submitButton}>
          Ajouter le score de pelz
        </button>
        {
          submitSuccess && (
            <div className={style.successMessage}>
              Le score de pelz a été ajouté. Rafraichissez la page !
            </div>
          )}
      </form>
    </>
  );
}

export default PelzForm;