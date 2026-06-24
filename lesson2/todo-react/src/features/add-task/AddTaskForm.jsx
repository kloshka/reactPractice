import Button from "@/shared/ui/Button"
import Field from "@/shared/ui/Field"
import {TasksContext} from "@/entities/todo"
import {useContext, useState} from 'react' 
const AddTaskForm = (props) => {

    const [newTaskTitle, setNewTaskTitle] = useState('') // для хранения значения поля ввода новой задачи. Изначально оно пустое.
    const {
        styles
    } = props
    const {
        addTask, 
        newTaskInputRef,
    } = useContext(TasksContext) // получаем из контекста массив задач и функцию для их изменения

    const onSubmit = (evt) => {
        evt.preventDefault()
        if (!isNewTaskTitleEmpty) {
            addTask(clearNewTaskTitle, () => {
                setNewTaskTitle('')
            })
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