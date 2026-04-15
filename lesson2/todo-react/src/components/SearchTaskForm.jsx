import Field from "./Field"

const SearchTaskForm = (props) => {
    const {
        onSearchInput, 
        searchQuery,
        setSearchQuery
    } = props

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