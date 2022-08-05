import logo from "./logo.svg";
import "./App.css";
import ToDoList from "./components/ToDoList";
import ListName from "./components/ListName";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="App">
      <Timer />
      <ListName name="My ToDo List" />
      <ToDoList />
    </div>
  );
}

export default App;
