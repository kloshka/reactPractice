import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"

const ToDo = () => {
    const tasks = [
        {
            id: 1,
            title: 'погладить кота',
            isDone: false,
        },  
        {
            id: 2,
            title: 'погладить собаку',
            isDone: true,
        }
    ]

    return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <ToDoInfo 
        total={tasks.length}
        done={tasks.reduce((acc, item) => item.isDone ? acc + 1 : acc, 0)}
      />  
      <ToDoList tasks={tasks}/>
    </div>
    )
}

export default ToDo