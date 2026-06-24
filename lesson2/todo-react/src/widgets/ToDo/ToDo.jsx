import AddTaskForm from "@/features/add-task"
import SearchTaskForm from "@/features/search-task"
import ToDoInfo from "@/features/stats"
import {TodoList} from "@/entities/todo"
import Button from "@/shared/ui/Button"
import {TasksContext} from "@/entities/todo"
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
      <TodoList styles={styles}/>
    </div>
    )
}

export default ToDo