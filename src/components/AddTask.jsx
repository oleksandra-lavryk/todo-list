export default function (props) {
  return (
    <>
      <input
        className="task-input"
        type="text"
        placeholder="Enter task name"
        value={props.inputTaskValue}
        onChange={props.handleinputTaskValue}
      />
      <input
        className="task-input"
        type="date"
        placeholder="Enter task deadline"
        value={props.inputTaskDeadline}
        onChange={props.handleinputTaskDeadline}
      />
      <button type="button" className="add-button" onClick={props.addItem}>
        Add new task
      </button>
      <div className="input-error">{props.inputTaskError}</div>
      <div className="input-error input-error-deadline">
        {props.inputDeadlineError}
      </div>
    </>
  );
}
