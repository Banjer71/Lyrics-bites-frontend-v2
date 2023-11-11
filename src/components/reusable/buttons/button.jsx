import React from "react";


const Button = ({ type, disabled, children, onClick }) => {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className="my-[10px] text-center w-full h-[40px] border bg-[#fce72cee] block pointer relative">
      {children}
    </button>
  );
};

export default Button;