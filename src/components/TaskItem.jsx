import { useState } from "react";
function TaskItemBorder(props) {
  return <div className="list-item-bordered">{props.children}</div>;
}

export default function TaskItem(props) {
  const [changeInput, setChangeInput] = useState(false);
  const [updateValue, setUpdateValue] = useState(props.description);
  const [inputValueError, setInputValueError] = useState("");

  const handleChangeInput = () => {
    setChangeInput(true);
  };
  const saveUpdateValue = () => {
    if (updateValue === "") {
      setInputValueError("Enter task name");
      return;
    }
    setInputValueError("");
    setChangeInput(false);
    props.updateItem(props.itemId, updateValue);
  };
  const handleUpdateValue = (e) => {
    setUpdateValue(e.target.value);
  };
  return (
    <li className={props.checked ? "list-item checked" : "list-item"}>
      <TaskItemBorder>
        {changeInput ? (
          <>
            <input
              className="update-input"
              type="text"
              checked={false}
              value={updateValue}
              onChange={handleUpdateValue}
            />
            <span className="input-error">{inputValueError}</span>
          </>
        ) : (
          <div className="list-item-text">
            {props.description} | {props.deadline}
          </div>
        )}

        <input
          id={`checkbox-mark-done-${props.itemId}`}
          className="done-checkbox"
          type="checkbox"
          checked={props.checked}
          onChange={props.handleInputChange}
        />
        <label
          htmlFor={`checkbox-mark-done-${props.itemId}`}
          className="done-checkbox-label"
        ></label>

        <button onClick={props.deleteItem}>Delete</button>
        {changeInput ? (
          <button onClick={saveUpdateValue}>Update</button>
        ) : (
          <button onClick={handleChangeInput}>Edit</button>
        )}
      </TaskItemBorder>
    </li>
  );
}
