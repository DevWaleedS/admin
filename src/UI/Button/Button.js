import React from "react";
import styles from "./Button.module.css";

const Button = ({
  type,
  color,
  fontSize,
  fontWeight,
  disabled = false,
  img,
  svg,
  children,
  onClick,
  className,
  style,
  textStyle,
  fontColor,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles["btn"]} ${styles[type]} ${className} duration-100`}
      style={style}
    >
      {svg && svg}
      {img && <img className={`${styles[color]}`} src={img} alt="" />}
      <h2
        className={`font-medium ${fontSize} ${fontWeight} ${fontColor}`}
        style={textStyle}
      >
        {children}
      </h2>
    </button>
  );
};

export default Button;
