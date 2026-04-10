import ToDoItem from "./ToDoItem"

const ToDoList = (props) => {
    const {tasks = []} = props 
    const hasTasks = true
    if (!hasTasks) {
        return (
            <div className="todo__empty-message"></div>
        )
    }
    return (
      <ul className="todo__list">
        {tasks.map((item) => (
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

export default ToDoList