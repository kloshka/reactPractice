import ToDoItem from "./ToDoItem"
import {memo, useCallback, useContext} from "react"
import {TasksContext} from "../context/TasksContext"
const ToDoList = () => {
  console.log('компонент ToDoList отрендерился')
    const {
      tasks,
      filteredTasks
    } = useContext(TasksContext) // получаем из контекста массив задач и функцию для их изменения 
    const hasTasks = tasks.length > 0
    const isEmptyFilteredTasks = filteredTasks?.length === 0
    if (!hasTasks) {
        return (
            <div className="todo__empty-message">There are no tasks yet</div>
        )
    }

    if (hasTasks && isEmptyFilteredTasks) {
        return (
            <div className="todo__empty-message">No tasks found</div>
        )
      }
    return (
      <ul className="todo__list">
        {(filteredTasks ?? tasks).map((item) => (
          <ToDoItem 
            /*className='todo__item'
            id={item.id}
            title={item.title}
            isDone={item.isDone}*/
            key={item.id}
            className='todo__item'
            {...item}
          />
          ))
        }
      </ul>
    )
}

export default memo(ToDoList)