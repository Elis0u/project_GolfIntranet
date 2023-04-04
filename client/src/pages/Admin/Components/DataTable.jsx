import React from 'react';
import DataRow from './DataRow';
import style from "../admin.module.css";
import { editData } from "../../../services/api.js";

const DataTable = ({ columns, data, onView, onUpdate, onDelete, onDataUpdated }) => {

  const handleToggleIsConfirmed = async (row) => {
    console.log("clique sur isConfirmed");
  
    const updatedRow = {
      ...row,
      isConfirmed: row.isConfirmed === 0 ? 1 : 0, // Inversez la valeur de isConfirmed
    };
  
    try {
      // Mettez à jour la donnée avec la nouvelle valeur de isConfirmed
      await editData("/user/update_isConfirmed", updatedRow);
  
      // Rechargez les données ou mettez à jour l'état pour refléter les modifications
      if (onDataUpdated) {
        onDataUpdated(updatedRow);
      }
    } catch (error) {
      console.error("Error updating isConfirmed:", error);
    }
  };

  return (
    <div className={style.tableWrapper}>
      <table className={style.table}>
        <thead>
          <tr>
            {columns
              .filter((column) => column.key !== 'user_id' && column.key !== 'category_id') // Filtrez user_id et category_id
              .map((column, index) => (
                <th key={index}>{column.header}</th>
              ))}
              <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <DataRow
              key={index}
              data={row}
              onView={() => onView(row)}
              onUpdate={() => onUpdate(row)}
              onDelete={() => onDelete(row)}
              onToggleIsConfirmed={() => handleToggleIsConfirmed(row)} // Ajoutez cette ligne
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;