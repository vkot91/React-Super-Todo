import React, { useState } from "react";
import MainList from "../MainList";
import Badge from "../Badge";
import closeModal from "../../assets/img/close-popup.svg";
/* Style */
import "./AddFolder.scss";

const AddFolder = ({ colors, onAddFolder }) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [name, setName] = useState("New category");

  //Default first color
  const [selectedColor, setSelectedColor] = useState(colors[0].id);

  //Save input value in state
  const [inputValue, setInputValue] = useState("");

  /* change state of modal window */
  function change() {
    setVisibleModal(!visibleModal);
    if (visibleModal === true) {
      setName("new category");
    } else if (visibleModal === false) {
      setName("Close popup");
    }
  }
  // Create new Folder
  const createFolder = () => {
    if (!inputValue) {
      alert("Write category name");
      return;
    }
    const color = colors.filter((item) => {
      return item.id === selectedColor;
    })[0].name;
    console.log(color);
    //Give our parametres to App.js
    onAddFolder({
      id: Math.floor(Math.random() * 1000),
      name: inputValue,
      color: color,
    });
  };

  return (
    <div className="add-list">
      <MainList
        onClick={() => change()}
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
            onClick={() => change()}
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
                  className={selectedColor === item.id ? "active" : ""}
                />
              );
            })}
          </div>
          <button className="button" onClick={createFolder}>
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFolder;
