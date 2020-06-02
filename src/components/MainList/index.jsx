import React from "react";
import Badge from "../Badge";

/*Style */
import classNames from "classnames";
import "./MainList.scss";

/*Icons*/
import removeSvg from "../../assets/img/delete.svg";
import Axios from "axios";

const MainList = ({ items, isRemovable, onClick, onRemove }) => {
  //Check delete
  const removeList = (item) => {
    if (window.confirm("You really want to delete this folder?")) {
      //Delete item from backend
      Axios.delete("http://localhost:3000/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    //onClick from AddFolder
    <ul className="list" onClick={onClick}>
      {items.map((item, index) => {
        return (
          <li
            key={index}
            //If item has property active(item.active) class = active or class from App.js
            className={classNames(item.className, { active: item.active })}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <span>{item.name}</span>
            {isRemovable && (
              <img
                src={removeSvg}
                className="list__remove-icon"
                alt="Remove icon"
                onClick={() => removeList(item)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MainList;
