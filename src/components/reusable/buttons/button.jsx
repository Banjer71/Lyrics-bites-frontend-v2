import React from "react";
import './button.css'

const Button = ({ type, disabled, children, onClick }) => {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className="">
      {children}
    </button>
  );
};

export default Button;