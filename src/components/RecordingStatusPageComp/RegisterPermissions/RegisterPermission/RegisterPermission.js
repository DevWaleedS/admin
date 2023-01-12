import React from "react";

const RegisterPermission = ({ title, onClick, selected, index }) => {
  const color = selected ? "#3AE374" : "#ADB5B9";
  return (
    <div
      onClick={onClick}
      className={`w-full h-20 flex justify-center items-center duration-200	cursor-pointer ${
        index === 0 ? "rounded-r-lg" : "" || index === 2 ? "rounded-l-lg" : ""
      }`}
      style={{
        backgroundColor: color,
      }}
    >
      <h2 style={{ color: "#fff" }}>{title}</h2>
    </div>
  );
};

export default RegisterPermission;
