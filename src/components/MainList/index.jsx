import React from "react";
import Badge from "../Badge";

/*Style */
import classNames from "classnames";
import "./MainList.scss";
const MainList = ({ items, isRemovable, onClick }) => {
  return (
    //onClick from AddFolder
    <ul className="todo__list" onClick={onClick}>
      {items.map((item, index) => {
        return (
          <li
            key={index}
            //If item has property active(item.active) class = active or class from App.js
            className={classNames(item.className, { active: item.active })}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
            <span>{item.name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default MainList;
