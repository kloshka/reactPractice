import Field from "../Field/Field"
import {useContext} from 'react'
import {TasksContext} from "../../context/TasksContext"
const SearchTaskForm = (props) => {
    const {
        styles
    } = props
    const {
        onSearchInput, 
        searchQuery,
        setSearchQuery
    } = useContext(TasksContext) // получаем из контекста массив задач и функцию для их изменения

    const onSubmit = (evt) => {
        evt.preventDefault()
    }   
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Field 
              className={styles.field} 
              label="Search task"
              id="search-task"
              type="search"
              value={searchQuery}
              onInput={(event) => setSearchQuery(event.target.value)}
            />
        </form>
    )
}

export default SearchTaskForm