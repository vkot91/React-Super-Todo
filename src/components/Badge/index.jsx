import React from "react";

import classNames from "classnames";

import "./Badge.scss";
const Badge = ({ color, onClick, className }) => {
  return (
    <i
      onClick={onClick}
      //Обязательный класс badge, далее если есть color: то используй badge--color
      //или просто используй className
      className={classNames("badge", { [`badge--${color}`]: color }, className)}
    ></i>
  );
};

export default Badge;
