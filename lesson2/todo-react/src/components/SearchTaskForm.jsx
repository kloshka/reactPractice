import Field from "./Field"
import {useContext} from 'react'
import {TasksContext} from "../context/TasksContext"
const SearchTaskForm = () => {
    const {
        onSearchInput, 
        searchQuery,
        setSearchQuery
    } = useContext(TasksContext) // получаем из контекста массив задач и функцию для их изменения

    const onSubmit = (evt) => {
        evt.preventDefault()
    }   
    return (
        <form className="todo__form" onSubmit={onSubmit}>
            <Field 
              className="todo__field" 
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