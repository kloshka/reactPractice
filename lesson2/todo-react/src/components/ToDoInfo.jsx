const ToDoInfo = (props) => {
    const {
      total,
      done, 
      onDeleteAllButtonClick,
    } = props
    const hasTasks = total > 0

    // const handler = (evt) => {
    //   console.log('клик!', evt, '- привычный объект event обернут в syntheticEvent, чтобы унифицировать evt в разных браузерах',
    //     evt.target
    //   )
    // }
    return (
      <div className="todo__info">
        <div className="todo__total-tasks">Done {done} from {total}</div>
        {hasTasks && (
          /*
          <button 
            className="todo__delete-all-button" 
            type="button"
            onClick={handler}
            >{/*
               onClick={() => console.log('Клик!')}  camelCase 
               В react не надо искать элементы в dom дереве, 
               обработчики сразу навешиваются на элемент в Jsx разметке.
               Это упрощает код и делает его декларативным
               
               React события - это все те же событие браузера, но с 
               более удобным синтаксисом и одинаковым поведением в браузерах
             
              Delete all
          </button>            
          */
          <button 
            className="todo__delete-all-button" 
            type="button"
            onClick={onDeleteAllButtonClick}
          >
            Delete all
          </button>
        )}
      </div>
    )
}
    
export default ToDoInfo
