const Field = () => {
    return (
        <div className="todo__field field">
            <label
            className="field__label"
            htmlFor="search-task"
            >
            New task
            </label>
            <input
            className="field__input"
            id="search-task"
            placeholder=" "
            autoComplete="off"
            type="search"
            />
        </div>
    )
}

export default Field