import React from 'react';
import style from '../admin.module.css';

const Navigation = ({ items, activeItem, setActiveItem }) => {
  return (
    <ul className={style.navigation}>
      {items.map((item, index) => (
        <li
          key={index}
          className={activeItem === item ? style.active : ''}
          onClick={() => setActiveItem(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;