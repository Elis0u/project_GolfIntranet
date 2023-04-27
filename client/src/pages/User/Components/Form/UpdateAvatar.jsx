import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../../../store/slices/user';
import { editData } from '../../../../services/api';

const UpdateAvatar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.infos);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Veuillez sélectionner un fichier');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    const TOKEN = localStorage.getItem("auth");

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': TOKEN,
      },
    };

    try {
      const response = await editData('/user/update_avatar', formData, config);
      const avatarName = response.data.result.avatarName;

      const updatedUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        phone: user.phone,
        handicap: user.handicap,
        avatarName: avatarName,
        isAdmin: user.isAdmin
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      dispatch(updateUser(updatedUser));

      setMessage('Avatar mis à jour avec succès');
    } catch (error) {
      if (error.response && error.response.data.error && error.response.data.error.includes('File size is too large')) {
        setMessage("Votre image est trop grande (max : 2MO)");
      } else {
        setMessage('Erreur lors de la mise à jour de l\'avatar');
      }
    }
  };

  return (
    <div>
      <h2>Mettre à jour l'avatar</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateAvatar;