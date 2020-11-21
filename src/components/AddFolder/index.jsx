import React, { useState, useEffect } from "react";
import MainList from "../MainList";
import Badge from "../Badge";
/* Style */
import "./AddFolder.scss";

/*Icons*/
import closeModal from "../../assets/img/close-popup.svg";
import Axios from "axios";

const AddFolder = ({ colors, onAddFolder }) => {
  //Modal open
  const [visibleModal, setVisibleModal] = useState(false);

  //Default name
  const [name, setName] = useState("New category");

  //Default first color
  const [selectedColor, setSelectedColor] = useState(3);

  //Save input value in state
  const [inputValue, setInputValue] = useState("");

  //loading state
  const [isLoading, setIsLoading] = useState(false);
  //useEffecr for check DOM loading array with colors and change them, use [0] as default
  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  /* change state of modal window */
  function changeModal() {
    setVisibleModal(!visibleModal);
    if (visibleModal === true) {
      setName("new category");
    } else if (visibleModal === false) {
      setName("Close popup");
    }
    setSelectedColor(colors[0].id);
    setInputValue("");
  }
  // Create new Folder
  const createFolder = () => {
    if (!inputValue) {
      alert("Write category name");
      return;
    }

    setIsLoading(true);
    // Add item to server
    Axios.post("/lists", {
      name: inputValue,
      colorId: selectedColor,
    })
      .then(({ data }) => {
        //Возвращаем обьект цвета, и вытаскиевем name
        const color = colors.filter((item) => {
          return item.id === selectedColor;
        })[0];
        //Создаем новый обьект и добавляем цвет
        const listObj = {
          ...data,
          color,
          //Item dont have tasks by default
          tasks: [],
        };
        //Give our parametres to App.js
        onAddFolder(listObj);
      })
      .finally(() => {
        //Reset modal
        changeModal();
        setIsLoading(false);
      });
  };
  return (
    <div className="add-list">
      <MainList
        onClick={changeModal}
        items={[
          {
            className: "add-list-button",
            icon: (
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 1V11"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 6H11"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: name,
          },
        ]}
      />
      {visibleModal === true && (
        <div className="add-list-popup">
          <img
            src={closeModal}
            alt="Close Modal Window"
            className="add-list-popup__close"
            onClick={changeModal}
          />
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="field"
            placeholder="Caregory name..."
          />
          <div className="add-list-popup__colors">
            {colors.map((item) => {
              return (
                <Badge
                  onClick={() => setSelectedColor(item.id)}
                  color={item.name}
                  key={item.id}
                  className={selectedColor === item.id && "active"}
                />
              );
            })}
          </div>
          <button className="button" onClick={createFolder}>
            {isLoading === false ? "Create" : "Loading..."}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFolder;
