import React from 'react';
import { IoTrashOutline, IoEyeOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import style from "../admin.module.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return date.toLocaleString('fr-FR', options);
};

const DataRow = ({ data, onView, onUpdate, onDelete, onToggleIsConfirmed, onToggleIsAdmin }) => (
  <tr>
    {Object.entries(data)
      .filter(([key]) => key !== 'user_id' && key !== 'category_id')
      .map(([key, value], index) => {
        let displayValue;

        const iso8601DateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

        if (key === 'content') {
          displayValue = value.slice(0, 100);
        } else if (typeof value === 'string' && iso8601DateRegex.test(value)) {
          displayValue = formatDate(value);
        } else {
          displayValue = value;
        }

        if (key === 'isConfirmed') {
          return (
            <td key={index}>
              <button
                onClick={onToggleIsConfirmed}
                className={value === 0 ? `${style.notConfirmed}` : `${style.confirmed}`}
              >
                {value === 0 ? "Non confirmé" : "Confirmé"}
              </button>
            </td>
          );
        } else if (key === 'isAdmin') {
          return (
            <td key={index}>
              <button
                onClick={() => onToggleIsAdmin(data.id, value)}
                className={value === 0 ? `${style.notConfirmed}` : `${style.confirmed}`}
              >
                {value === 0 ? "Non-admin" : "Admin"}
              </button>
            </td>
          );
        } else {
          return <td key={index}>{displayValue}</td>;
        }
      })}
    <td className={style.btnsActions}>
      <button className={style.btnAction} onClick={onView}><IoEyeOutline /></button>
      <button className={style.btnAction} onClick={onUpdate}><AiOutlineEdit /></button>
      <button className={style.btnAction} onClick={onDelete}><IoTrashOutline /></button>
    </td>
  </tr>
);

export default DataRow;