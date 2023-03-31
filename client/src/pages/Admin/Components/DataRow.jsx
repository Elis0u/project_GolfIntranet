import React from 'react';
import { IoTrashOutline, IoEyeOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import style from "../admin.module.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  const formattedDate = date.toLocaleDateString('fr-FR', dateOptions);
  const formattedTime = date.toLocaleTimeString('fr-FR', timeOptions);

  return `${formattedDate} ${formattedTime}`;
};

const DataRow = ({ data, onView, onUpdate, onDelete }) => (
  <tr>
    {Object.entries(data)
      .filter(([key]) => key !== 'user_id' && key !== 'category_id') // Filtrez user_id et category_id
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
        return <td key={index}>{displayValue}</td>;
      })}
    <td className={style.btnsActions}>
      <button className={style.btnAction} onClick={onView}><IoEyeOutline /></button>
      <button className={style.btnAction} onClick={onUpdate}><AiOutlineEdit /></button>
      <button className={style.btnAction} onClick={onDelete}><IoTrashOutline /></button>
    </td>
  </tr>
);

export default DataRow;