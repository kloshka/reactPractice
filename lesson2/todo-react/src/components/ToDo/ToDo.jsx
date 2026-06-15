import AddTaskForm from "../AddTaskForm/AddTaskForm"
import SearchTaskForm from "../SearchTaskForm/SearchTaskForm"
import ToDoInfo from "../ToDoInfo/ToDoInfo"
import ToDoList from "../ToDoList/ToDoList"
import Button from "../Button/Button"
import {TasksContext} from "../../context/TasksContext"
import {useContext} from 'react' //такие функции называют хуками.

import styles from "./ToDo.module.scss"

const ToDo = () => {
    console.log('компонент ToDo отрендерился')
    const {
      firstIncompleteTaskRef,
      firstIncompleteTaskId
    } = useContext(TasksContext) // получаем из контекста массив задач и функцию для их изменения
    return (
    <div className={styles.todo}>
      <h1 className={styles.title}>To Do List</h1>
      <AddTaskForm styles={styles} />
      <SearchTaskForm  styles={styles}/>
      <ToDoInfo styles={styles}/>  
      <Button onClick={
        () => firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})
        }>
        Show first incomplete task
        </Button>
      <ToDoList styles={styles}/>
    </div>
    )
}

export default ToDo