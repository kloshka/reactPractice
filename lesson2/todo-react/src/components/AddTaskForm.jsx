import Button from "./button"
import Field from "./Field"

const AddTaskForm = (props) => {
    const {
        addTask, 
        newTaskInputRef,
        newTaskTitle, 
        setNewTaskTitle
    } = props

    const onSubmit = (evt) => {
        evt.preventDefault()
        addTask()
    }
    return (
        <form className="todo__form" onSubmit={onSubmit}>
            <Field 
              className="todo__field"
              label="New task title"
              id="new-task"
              ref={newTaskInputRef}
              value={newTaskTitle}
              onInput={(evt) => setNewTaskTitle(evt.target.value)}
            />
            <Button type="submit">Add</Button>
        </form>
    )
}

export default AddTaskForm