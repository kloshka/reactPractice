import Button from "./button"
import Field from "./Field"

const AddTaskForm = (props) => {
    const {addTask, newTaskTitle, setNewTaskTitle} = props

    const onSubmit = (evt) => {
        evt.preventDefault()
        addTask(newTaskTitle, setNewTaskTitle)
    }
    return (
        <form className="todo__form" onSubmit={onSubmit}>
            <Field 
              className="todo__field"
              label="New task title"
              id="new-task"
              value={newTaskTitle}
              onInput={(evt) => setNewTaskTitle(evt.target.value)}
            />
            <Button type="submit">Add</Button>
        </form>
    )
}

export default AddTaskForm