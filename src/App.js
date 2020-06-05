import React, { useState, useEffect } from "react";
import MainList from "./components/MainList";
import AddFolder from "./components/AddFolder";
import Tasks from "./components/Tasks";

import axios from "axios";

//Router
import { Route, useHistory } from "react-router-dom";

const App = () => {
  // const [lists, setLists] = useState(
  //   //Обработка JSON файла,цвет из colorId
  //   database.lists.map((item) => {
  //     item.color = database.colors.filter((color) => {
  //       return color.id === item.colorId;
  //     })[0].name;
  //     return item;
  //   })
  // );
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [itemActive, setItemActive] = useState(null);
  let history = useHistory();
  //Следит за тем что бы выполнилось только тогда когда компонент загрузился
  useEffect(() => {
    axios
      .get("http://localhost:3000/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3000/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  //Create new folder in state
  const onAddFolder = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  //Create new task in state
  const onAddTask = (taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === taskObj.listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  //Remove folder from state
  const onRemoveFolder = (id) => {
    const newLists = lists.filter((item) => {
      return item.id !== id;
    });
    setLists(newLists);
    //Push for redirect
    history.push("/");
  };

  //Set active attribute to item;
  const onActiveItem = (item) => {
    //Router method to create path
    history.push(`/lists/${item.id}`);
    setItemActive(item);
  };

  /*UseEffect  работает при каждой перезагрузке страницы*/
  useEffect(() => {
    const listId = history.location.pathname.split("lists/")[1];
    if (lists) {
      const list = lists.find((item) => item.id === Number(listId));
      setItemActive(list);
    }
  }, [lists, history.location.pathname]);

  const onEditTitle = (id, title) => {
    //Change name in state
    const newLists = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newLists);
  };

  /* WORK WITH TASKS */

  //Edit task text
  const onEditTask = (listId, taskObj) => {
    console.log(listId, taskObj);
    const newTaskText = window.prompt("New task:", taskObj.text);
    if (newTaskText.length === 0) {
      alert("Write some text please!");
      return;
    }
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    //Change name in JSON-server.Method:patch
    axios
      .patch(`http://localhost:3000/tasks/${taskObj.id}`, {
        text: newTaskText,
      })
      .catch(() => {
        alert("Error");
      });
  };

  //Check task
  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);

    axios
      .patch(`http://localhost:3000/tasks/${taskId}`, {
        completed: completed,
      })
      .catch(() => {
        alert("Error");
      });
  };

  //Delete task
  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("You really wany to delete task?")) {
      const newList = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
          alert("Your item was succesfully deleted!");
        }

        return item;
      });
      setLists(newList);
      //Change name in JSON-server.Method:patch
      axios.delete(`http://localhost:3000/tasks/${taskId}`).catch(() => {
        alert("Error");
      });
    }
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <MainList
          //Routing to main page
          onActiveItem={(list) => {
            history.push(`/`);
            setItemActive(list);
          }}
          items={[
            {
              active: history.location.pathname === "/",
              icon: (
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.96 5.10001H5.74001C5.24321 5.10001 5.20001 5.50231 5.20001 6.00001C5.20001 6.49771 5.24321 6.90001 5.74001 6.90001H10.96C11.4568 6.90001 11.5 6.49771 11.5 6.00001C11.5 5.50231 11.4568 5.10001 10.96 5.10001ZM12.76 9.60001H5.74001C5.24321 9.60001 5.20001 10.0023 5.20001 10.5C5.20001 10.9977 5.24321 11.4 5.74001 11.4H12.76C13.2568 11.4 13.3 10.9977 13.3 10.5C13.3 10.0023 13.2568 9.60001 12.76 9.60001ZM5.74001 2.40001H12.76C13.2568 2.40001 13.3 1.99771 13.3 1.50001C13.3 1.00231 13.2568 0.600006 12.76 0.600006H5.74001C5.24321 0.600006 5.20001 1.00231 5.20001 1.50001C5.20001 1.99771 5.24321 2.40001 5.74001 2.40001ZM2.86001 5.10001H1.24001C0.743212 5.10001 0.700012 5.50231 0.700012 6.00001C0.700012 6.49771 0.743212 6.90001 1.24001 6.90001H2.86001C3.35681 6.90001 3.40001 6.49771 3.40001 6.00001C3.40001 5.50231 3.35681 5.10001 2.86001 5.10001ZM2.86001 9.60001H1.24001C0.743212 9.60001 0.700012 10.0023 0.700012 10.5C0.700012 10.9977 0.743212 11.4 1.24001 11.4H2.86001C3.35681 11.4 3.40001 10.9977 3.40001 10.5C3.40001 10.0023 3.35681 9.60001 2.86001 9.60001ZM2.86001 0.600006H1.24001C0.743212 0.600006 0.700012 1.00231 0.700012 1.50001C0.700012 1.99771 0.743212 2.40001 1.24001 2.40001H2.86001C3.35681 2.40001 3.40001 1.99771 3.40001 1.50001C3.40001 1.00231 3.35681 0.600006 2.86001 0.600006Z"
                    fill="#7C7C7C"
                  />
                </svg>
              ),
              name: "all categories",
            },
          ]}
        />
        {lists && (
          <MainList
            items={lists}
            onRemoveFolder={onRemoveFolder}
            onActiveItem={onActiveItem}
            //State
            itemActive={itemActive}
            isRemovable={true}
          />
        )}
        <AddFolder colors={colors} onAddFolder={onAddFolder} />
      </div>
      <div className="todo__tasks">
        {/*"Main page"*/}
        <Route exact path="/">
          {lists &&
            lists.map((item) => {
              return (
                <Tasks
                  key={item.id}
                  list={item}
                  onAddTask={onAddTask}
                  onEditTitle={onEditTitle}
                  onEditTask={onEditTask}
                  onCompleteTask={onCompleteTask}
                  onRemoveTask={onRemoveTask}
                  withoutEmpty
                />
              );
            })}
        </Route>
        {/*TASKS COMPONENT*/}
        <Route path="/lists/:id">
          {lists && itemActive && (
            <Tasks
              list={itemActive}
              onAddTask={onAddTask}
              onEditTitle={onEditTitle}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
              onRemoveTask={onRemoveTask}
            />
          )}
        </Route>
      </div>
    </div>
  );
};

export default App;
