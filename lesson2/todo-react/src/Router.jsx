import {useEffect, useState} from "react";

const matchPath = (path, route) => { // функци по умному сравниватб путь из url адреса с конкретным шаблоном, который мы ожидаем
     //path - это путь из url адреса, который мы хотим сравнить с шаблоном route
    // route - это шаблон из routes в app, который мы хотим сравнить с путем из url адреса. Например, /tasks/:id
    const pathParts = path.split('/') // /tasks/123 -> ['', 'tasks', '123']
    const routeParts = route.split('/')

    if (pathParts.length !== routeParts.length) {  
        return null // если количество частей в пути и шаблоне не совпадает, то это не совпадение
    } 

    const params = {} // объект для хранения параметров из пути, например {id: '123'}

    for (let i=0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) { // если часть шаблона начинается с :, то это параметр
            const paramName = routeParts[i].slice(1) // извлекаем имя параметра, убирая символ ':'
            params[paramName] = pathParts[i] // сохраняем значение параметра
        } else if (routeParts[i] !== pathParts[i]) { // если часть шаблона не совпадает с частью пути, то это не совпадение
            return null
        }
    }
    return params
}

export const useRoute = () => {
    const [path, setPath] = useState(window.location.pathname)

    
    useEffect(() => {
        const onLocationChange = () => {
            setPath(window.location.pathname)
        }
        window.addEventListener('popstate', onLocationChange) 
    //popstate - событие, которое возникает, когда изменяется активная запись в истории браузера. 
    // Это может произойти, например, при нажатии кнопки "Назад" или "Вперед" в браузере, 
    // или при вызове метода history.pushState() или history.replaceState().
        
        return () => {
            window.removeEventListener('popstate', onLocationChange)
        }
    }, [])

    return path
}

const Router = (props) => {
    const {routes} = props
    const path = useRoute()

    // if (path.startsWith('/tasks/')) {
    //     const id = path.replace('/tasks/', '') // извлекаем id из пути
    //     const TaskPage = routes['/tasks/:id'] // :id - это параметр, который может принимать любое значение

    //     return <TaskPage params={{ id }} /> // передаем id в компонент TaskPage
    // }

    // const Page = routes[path] ?? routes["*"] // * это путь к 404 странице

    // return <Page />
// т.к. Page - хранит в себе ссылку на компонент, то мы его рендерим


    for (const route in routes) {
        const params = matchPath(path, route)
        if (params) {
            const Page = routes[route]
            return <Page params={params} />
        }
    }

    const NotFoundPage = routes['*']
    return <NotFoundPage />
}
export default Router