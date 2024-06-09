// Square.js
import React from 'react';
import './Square.css';

const Square = ({ onClick, value }) => {
  return (
    <button className="column" onClick={onClick}>
      {value && <img width="50px" height="50px" src={value} alt="Marker" />}
    </button>
  );
};

export default Square;
