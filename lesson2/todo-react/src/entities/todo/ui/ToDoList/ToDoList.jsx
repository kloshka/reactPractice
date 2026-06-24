import { ToDoItem } from "@/entities/todo"
import {memo, useCallback, useContext} from "react"
import {TasksContext} from "@/entities/todo"

const ToDoList = (props) => {
  console.log('компонент ToDoList отрендерился')
    const {styles} = props
    const {
      tasks,
      filteredTasks
    } = useContext(TasksContext) // получаем из контекста массив задач и функцию для их изменения 
    const hasTasks = tasks.length > 0
    const isEmptyFilteredTasks = filteredTasks?.length === 0
    if (!hasTasks) {
        return (
            <div className={styles.emptyMessage}>There are no tasks yet</div>
        )
    }

    if (hasTasks && isEmptyFilteredTasks) {
        return (
            <div className={styles.emptyMessage}>No tasks found</div>
        )
      }
    return (
      <ul className={styles.list}>
        {(filteredTasks ?? tasks).map((item) => (
          <ToDoItem 
            /*className='todo__item'
            id={item.id}
            title={item.title}
            isDone={item.isDone}*/
            key={item.id}
            className={styles.item}
            {...item}
          />
          ))
        }
      </ul>
    )
}

export default memo(ToDoList)