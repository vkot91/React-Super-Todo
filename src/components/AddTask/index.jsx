import React, { Fragment, useState } from "react";
import addTaskSvg from "../../assets/img/add_task.svg";
import "./AddTask.scss";
import Axios from "axios";

const AddTask = ({ list, onAddTask }) => {
  const [activeForm, setActiveForm] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createTask = () => {
    setIsLoading(true);
    Axios.post("http://localhost:3000/tasks", {
      listId: list.id,
      text: inputValue,
      completed: false,
    })
      .then(({ data }) => {
        onAddTask(data);
      })
      .finally(() => {
        //Form and input states
        setInputValue("");
        setActiveForm(false);
        setIsLoading(false);
      });
  };
  return (
    <Fragment>
      {activeForm === false && (
        <div className="tasks__form-new" onClick={() => setActiveForm(true)}>
          <img src={addTaskSvg} alt="Create Task Icon" />
          <span>New task</span>
        </div>
      )}

      {activeForm === true && (
        <div className="tasks__form-active">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="field"
            placeholder="Task name..."
          />
          <button disabled={isLoading} className="button" onClick={createTask}>
            {isLoading === false ? "Create" : "Loading..."}
          </button>
          <button
            className="button button--grey"
            onClick={() => setActiveForm(false)}
          >
            Go back
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default AddTask;
