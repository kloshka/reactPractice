import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"
import Button from "./button"
import {TasksContext} from "../context/TasksContext"
import {useContext} from 'react' //такие функции называют хуками.
const ToDo = () => {
    console.log('компонент ToDo отрендерился')
    const {
      firstIncompleteTaskRef,
      firstIncompleteTaskId
    } = useContext(TasksContext) // получаем из контекста массив задач и функцию для их изменения
    return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <ToDoInfo />  
      <Button onClick={
        () => firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})
        }>
        Show first incomplete task
        </Button>
      <ToDoList />
    </div>
    )
}

export default ToDo