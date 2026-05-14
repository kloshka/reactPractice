const Field = (props) => {
    const {
        className = '',
        id,
        label,
        type = 'text',
        onInput, 
        value,
        ref, 
        error
    } = props
    return (
        <div className={`${className} field`}>
            <label
            className={`field__label ${error ? "is-invalid" : ""}`}
            htmlFor={id}
            >
            {label}
            </label>
            <input
            className="field__input"
            id={id}
            placeholder=" "
            autoComplete="off"
            type={type}
            value={value}
            onInput={onInput}
            ref={ref}
            />
            {error && <span className="field__error" title={error}>{error}</span>}
        </div>
    )
}

export default Field