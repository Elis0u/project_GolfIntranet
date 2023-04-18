import React from 'react';
import DataRow from './DataRow';
import style from "../admin.module.css";
import { editData } from "../../../services/api.js";

const DataTable = ({ columns, data, onView, onUpdate, onDelete, onDataUpdated }) => {

  const handleToggleIsConfirmed = async (row) => {
  
    const updatedRow = {
      ...row,
      isConfirmed: row.isConfirmed === 0 ? 1 : 0,
    };
  
    try {
      await editData("/user/update_isConfirmed", updatedRow);
      if (onDataUpdated) {
        onDataUpdated(updatedRow);
      }
    } catch (error) {
    }
  };

  const handleToggleIsAdmin = async (row) => {
  
    const updatedRow = {
      ...row,
      isAdmin: row.isAdmin === 0 ? 1 : 0,
    };
  
    try {
      await editData("/user/update_isAdmin", updatedRow);
  
      if (onDataUpdated) {
        onDataUpdated(updatedRow);
      }
    } catch (error) {
    }
  };

  return (
    <section className={style.tableWrapper}>
      <table className={style.table}>
        <thead>
          <tr>
            {columns
              .filter((column) => column.key !== 'user_id' && column.key !== 'category_id') 
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
              onToggleIsConfirmed={() => handleToggleIsConfirmed(row)}
              onToggleIsAdmin={() => handleToggleIsAdmin(row)}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default DataTable;