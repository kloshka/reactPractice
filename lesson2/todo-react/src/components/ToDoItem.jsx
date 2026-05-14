import {memo, useCallback, useContext} from "react"
import {TasksContext} from "../context/TasksContext"
const ToDoItem = (props) => {
  console.log('компонент ToDoItem отрендерился')
    const {
       className = '',
       id,
       title, 
       isDone, 
    } = props

    const {
      firstIncompleteTaskId,
      firstIncompleteTaskRef,
      deleteTask,
      toggleTaskComplete
    } = useContext(TasksContext) // получаем из контекста массив задач и функцию для их изменения 
    // или можно было так: const ToDoItem = ({bebra, isChmo}) => {
    return (
        <li className={`todo__item todo-item ${className}`} ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null} >
          <input
            className="todo-item__checkbox"
            id={id}
            type="checkbox"
            checked={isDone}
            onChange={(evt) => toggleTaskComplete(id, evt.target.checked)}
            // readOnly
          />
          <label
            className="todo-item__label"
            htmlFor={id}
          >
            {title}
          </label>
          <button
            className="todo-item__delete-button"
            aria-label="Delete"
            title="Delete"
            onClick={() => deleteTask(id)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#757575"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
    )
}

export default memo(ToDoItem)