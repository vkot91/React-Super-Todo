import React from "react";
import Badge from "../Badge";

/*Style */
import classNames from "classnames";
import "./MainList.scss";

/*Icons*/
import removeSvg from "../../assets/img/delete.svg";
import Axios from "axios";
const MainList = ({
  items,
  isRemovable,
  onClick,
  onRemoveFolder,
  onActiveItem,
  itemActive,
}) => {
  //Check delete
  const removeList = (item) => {
    console.log(item);
    if (window.confirm("You really want to delete this folder?")) {
      //Delete item from backend
      Axios.delete("http://localhost:3000/lists/" + item.id).then(() => {
        onRemoveFolder(item.id);
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
            //Check for main List and add Folder
            onClick={onActiveItem ? () => onActiveItem(item) : null}
            //If item has property active from state(itemActive) class = active or class from App.js
            className={classNames(item.className, {
              //Check for null && - necessarily
              //item.active - MAIN ITEM!!
              active: item.active
                ? item.active
                : itemActive && itemActive.id === item.id,
            })}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <span>
              {item.name}
              {item.tasks && ` (${item.tasks.length})`}
            </span>
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
