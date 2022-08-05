import TaskItem from "./TaskItem";
import AddTask from "./AddTask";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function ToDoList() {
  const [items, setItems] = useState([]);
  const [inputTaskValue, setInputTaskValue] = useState("");
  const [inputTaskDeadline, setInputTaskDeadline] = useState("");
  const [inputTaskError, setInputTaskError] = useState("");
  const [inputDeadlineError, setInputDeadlineError] = useState("");

  function formatDate(date) {
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    return date.getFullYear() + "-" + month + "-" + day;
  }

  useEffect(() => {
    let today = new Date();
    setInputTaskDeadline(formatDate(today));
    fetch(
      "https://gist.githubusercontent.com/benna100/391eee7a119b50bd2c5960ab51622532/raw"
    )
      .then((response) => response.json())
      .then((result) => {
        setItems(
          result.map((item) => {
            return { ...item, isChecked: false };
          })
        );
      });
  }, []);

  const addItem = () => {
    if (inputTaskValue === "") {
      setInputDeadlineError("");
      setInputTaskError("Enter task name");
      return;
    }
    if (inputTaskDeadline === "") {
      setInputTaskError("");
      setInputDeadlineError("Enter task deadline");
      return;
    }
    setInputTaskError("");
    setInputDeadlineError("");
    setItems((prevItems) => {
      return [
        ...prevItems,
        {
          id: new Date().getTime(),
          deadline: inputTaskDeadline,
          description: inputTaskValue,
          isChecked: false,
        },
      ];
    });
  };
  const deleteItem = (idToDelete) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id != idToDelete);
    });
  };

  const handleInputChange = (itemId) => {
    const itemsChecked = [...items];
    itemsChecked.map((item) => {
      if (item.id === itemId) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });
    setItems(itemsChecked);
  };

  const handleinputTaskValue = (e) => {
    setInputTaskValue(e.target.value);
  };
  const handleinputTaskDeadline = (e) => {
    setInputTaskDeadline(e.target.value);
  };

  const updateItem = (itemId, updateValue) => {
    const updatedItems = [...items];
    updatedItems.map((item) => {
      if (item.id === itemId) {
        item.description = updateValue;
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <>
      <AddTask
        addItem={addItem}
        inputTaskValue={inputTaskValue}
        inputTaskDeadline={inputTaskDeadline}
        inputTaskError={inputTaskError}
        inputDeadlineError={inputDeadlineError}
        handleinputTaskValue={handleinputTaskValue}
        handleinputTaskDeadline={handleinputTaskDeadline}
      />
      <ul className="list">
        {items.length ? (
          items.map((item) => {
            return (
              <TaskItem
                key={item.id}
                itemId={item.id}
                checked={item.isChecked}
                description={item.description}
                deadline={item.deadline}
                handleInputChange={() => handleInputChange(item.id)}
                updateItem={updateItem}
                deleteItem={() => deleteItem(item.id)}
              />
            );
          })
        ) : (
          <p>No items</p>
        )}
      </ul>
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  description: PropTypes.string,
  deadline: PropTypes.string,
  handleInputChange: PropTypes.func,
};
