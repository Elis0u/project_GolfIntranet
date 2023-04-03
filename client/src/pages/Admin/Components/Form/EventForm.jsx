import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addData, editData, getDatas } from '../../../../services/api.js';
import style from "./addForm.module.css";
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

function EventForm({ isEditMode = false, initialData, onSubmitSuccess }) {
    const [categories, setCategories] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const categories = await getDatas("/categoriesevent");
                setCategories(categories.data.result);
            } catch (err) {
                throw new Error(err);
            }
        }
        fetchData();
    }, []);

    const [inputs, setInputs] = useState({
        title: isEditMode && initialData ? initialData.title : '',
        location: isEditMode && initialData ? initialData.location : '',
        categoryId: isEditMode && initialData ? initialData.categoryId : ''
    });

    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');

    const { title, location, categoryId } = inputs;
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

    const handleDateTimeChange = (type, momentObj) => {
        if (type === 'start') {
            setStartDateTime(momentObj);
        } else if (type === 'end') {
            setEndDateTime(momentObj);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                title,
                location,
                startEvent: startDateTime && startDateTime.toISOString ? startDateTime.toISOString() : '',
                endEvent: endDateTime && endDateTime.toISOString ? endDateTime.toISOString() : '',
                categoryId,
                userId,
            };

            if (isEditMode && initialData) {
                formData.id = initialData.id;
                await editData("/events", formData);
                console.log('event modifiée avec succès');
            } else {
                console.log(formData);
                await addData("/events", formData);
                console.log('event ajoutée avec succès');
            }

            setSubmitSuccess(true);
            onSubmitSuccess();

        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'event', error);
        }
    };

    return (
        <>
            {isEditMode ? (
                <h3>Edit de l'event'</h3>
            ) : (
                <h3>Ajout d'un event</h3>
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
                <div className={style.inputGroup}>
                    <label htmlFor="location" className={style.addForm_label}>Localisation</label>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        value={location}
                        className={style.addForm_input}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        required
                    />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="startDateTime" className={`${style.addForm_label} ${style.dateTime}`}>Date et heure de début</label>
                    <DateTime
                        value={startDateTime}
                        className={`${style.addForm_input}`}
                        onChange={(momentObj) => handleDateTimeChange('start', momentObj)}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        inputProps={{ required: true }}
                    />
                </div>

                <div className={style.inputGroup}>
                    <label htmlFor="endDateTime" className={`${style.addForm_label} ${style.dateTime}`}>Date et heure de fin</label>
                    <DateTime
                        value={endDateTime}
                        className={`${style.addForm_input}`}
                        onChange={(momentObj) => handleDateTimeChange('end', momentObj)}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        inputProps={{ required: true }}
                    />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="categoryId" className={style.addForm_label}>Catégorie</label>
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
                    {isEditMode ? 'Modifier l\'event' : 'Ajouter l\'event'}
                </button>
                {
                    submitSuccess && (
                        <div className={style.successMessage}>
                            {isEditMode ? 'L\'event a été modifiée avec succès.' : 'L\'event a été ajoutée avec succès.'}
                        </div>
                    )}
            </form>
        </>
    );
}

export default EventForm;