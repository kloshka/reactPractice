import ToDoItem from "./ToDoItem"

const ToDoList = (props) => {
    const {tasks = [],
      onDeleteTaskButtonClick,
      onTaskCompleteChange,
      filteredTasks
    } = props 
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
            onDeleteTaskButtonClick={onDeleteTaskButtonClick}
            onTaskCompleteChange={onTaskCompleteChange}
            className='todo__item'
            {...item}
          />
          ))
        }
      </ul>
    )
}

export default ToDoList