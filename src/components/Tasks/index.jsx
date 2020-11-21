import React from "react";
import AddTask from "../AddTask";
import editSvg from "../../assets/img/edit_title.svg";

import "./Tasks.scss";

import Axios from "axios";
import Task from "../Task";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  onEditTask,
  onCompleteTask,
  onRemoveTask,
  withoutEmpty,
}) => {
  //Edit folder name
  const editTitle = () => {
    const newTitle = window.prompt("Write category name", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      //Change name in JSON-server.Method:patch
      Axios.patch(`/lists/${list.id}`, {
        name: newTitle,
      }).catch(() => {
        alert("Error");
      });
    }
  };
  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="Edit icon" />
      </h2>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Task list clear</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onCompleteTask={onCompleteTask}
              //Вытащить все свойства из task
              {...task}
            />
          ))}
        <AddTask key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
