import Button from "../Button/Button"
import Field from "../Field/Field"
import {TasksContext} from "../../context/TasksContext"
import {useContext, useState} from 'react' 
const AddTaskForm = (props) => {
    const {
        styles
    } = props
    const {
        addTask, 
        newTaskInputRef,
        newTaskTitle, 
        setNewTaskTitle
    } = useContext(TasksContext) // получаем из контекста массив задач и функцию для их изменения

    const onSubmit = (evt) => {
        evt.preventDefault()
        if (!isNewTaskTitleEmpty) {
            addTask(clearNewTaskTitle)
        }
    }
    const [error, setError] = useState(null)
    const clearNewTaskTitle = newTaskTitle.trim()
    const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

    const onInput = (evt) => {
        const value = evt.target.value
        setNewTaskTitle(value)
        const clearValue = value.trim()
        const hasOnlySpaces = clearValue.length === 0 && value.length > 0
        setError(hasOnlySpaces ? "The task cannot be empty" : "")
    }
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Field 
              error={error}
              className={styles.field}
              label="New task title"
              id="new-task"
              ref={newTaskInputRef}
              value={newTaskTitle}
              onInput={onInput}
            />
            <Button 
            type="submit"
            isDisabled={isNewTaskTitleEmpty}
            >Add</Button>
        </form>
    )
}

export default AddTaskForm