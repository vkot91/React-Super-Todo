import React from "react";
import AddTask from "../AddTask";
import editSvg from "../../assets/img/edit_title.svg";

import "./Tasks.scss";

import Axios from "axios";

const Tasks = ({ list, onEditTitle, onAddTask }) => {
  const editTitle = () => {
    const newTitle = window.prompt("Write category name", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      //Change name in JSON-server.Method:patch
      Axios.patch(`http://localhost:3000/lists/${list.id}`, {
        name: newTitle,
      }).catch(() => {
        alert("Error");
      });
    }
  };
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
        <img src={editSvg} alt="Edit Icon" onClick={editTitle} />
      </h2>
      <div className="tasks__items">
        {/* Проверка на количество задач,если 0 то: */}
        {!list.tasks.length && <h2>No tasks</h2>}
        {list.tasks.map((item) => {
          return (
            <div className="tasks__items-raw" key={item.id}>
              <div className="checkbox">
                <input id={`task-${item.id}`} type="checkbox" />
                <label htmlFor={`task-${item.id}`}>
                  <svg
                    width="11"
                    height="8"
                    viewBox="0 0 11 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
              </div>
              <input type="text" readOnly value={item.text} />
            </div>
          );
        })}
        <div className="tasks__form">
          <AddTask list={list} onAddTask={onAddTask} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
