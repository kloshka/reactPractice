const RouterLink = (props) => {
    const {
        to, // to - это путь, на который мы хотим перейти при клике на ссылку
        children,
        ...rest
    } = props

    const handleClick = (e) => {
        e.preventDefault()
        window.history.pushState({}, "", to) 
// pushState - позволяет изменить URL без перезагрузки страницы. 
// Первый аргумент - это состояние, которое мы хотим сохранить (можем оставить пустым объектом),
// второй аргумент - это заголовок страницы (можем оставить null),
//  третий аргумент - это новый URL, на который мы хотим перейти
        window.dispatchEvent(new PopStateEvent('popstate'))
    }

    return (
        <a href={to} onClick={handleClick}{...rest}>
            {children}
        </a>
    )
}

export default RouterLink