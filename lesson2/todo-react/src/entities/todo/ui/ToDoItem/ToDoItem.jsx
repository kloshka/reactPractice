import {memo, useContext} from "react"
import {TasksContext} from "@/entities/todo"
import RouterLink from "@/shared/ui/RouterLink"
import styles from "./ToDoItem.module.scss"
// import  useCombinedRefs  from "../../hooks/useCombinedRefs"
import { useRef } from "react"
import { highLightCaseInsensitive } from "@/shared/utils/highlight"

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
      toggleTaskComplete,
      disappearingTaskId,
      appearingTaskId,
      searchQuery,
    } = useContext(TasksContext) // получаем из контекста массив задач и функцию для их изменения 

    const higlightedTitle = highLightCaseInsensitive(title, searchQuery)
    // const animationRef = useRef(null)
    // const combinedRef = useCombinedRefs(
    //   animationRef, 
    //   id === firstIncompleteTaskId ? firstIncompleteTaskRef : null
    // ) 

    // const handleClick = () => {
    //   animationRef.current?.classList.add(styles.isDisappearing)
    //   setTimeout(() => {
    //     deleteTask(id)
    //   }, 400)
    // }
    // или можно было так: const ToDoItem = ({bebra, isChmo}) => {
    return (
        <li 
          className={` 
            ${styles.ToDoItem} 
            ${className} 
            ${disappearingTaskId === id ? styles.isDisappearing : ''}
            ${appearingTaskId === id ? styles.isAppearing : ""}
            ` 
          } 
          ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}>
          <input
            className={styles.checkbox}
            id={id}
            type="checkbox"
            checked={isDone}
            onChange={(evt) => toggleTaskComplete(id, evt.target.checked)}
            // readOnly
          />
          <label
            className={`${styles.label} visually-hidden`}
            htmlFor={id}
          >
            {title}
          </label>
          <RouterLink to={`/tasks/${id}`} aria-label="task detail page">
            <span dangerouslySetInnerHTML={{__html: higlightedTitle}}></span>
          </RouterLink>
          <button
            className={styles.deleteButton}
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