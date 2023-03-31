import React from 'react';
import DataRow from './DataRow';
import style from "../admin.module.css";

const DataTable = ({ columns, data, onView, onUpdate, onDelete }) => (
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
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;