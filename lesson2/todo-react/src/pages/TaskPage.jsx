import { useEffect, useState } from "react"
import tasksAPI from "../api/tasksAPI"

const TasksPage = (props) => {
    const {params} = props

    const taskId = params.id
    const [task, setTask] = useState(null) // хранит объект задачи с id и isdone
    const [isLoading, setIsLoadaing] = useState(true) // хранит состояние загрузки данных с сервера, true - Данные загружаются
    const [hasError, setHasError] = useState(false) 

    useEffect(() => {
        tasksAPI.getById(taskId)
            .then((taskData) => {
                setTask(taskData) // сохраняем данные задачи в состоянии task
                setHasError(false) // сбрасываем ошибку, если данные успешно получены
            })
            .catch(() => {
                setHasError(true) // устанавливаем ошибку, если произошла ошибка при получении данных
            })
            .finally(() => {
                setIsLoadaing(false) // устанавливаем isLoading в false, так как загрузка данных завершена (успешно или с ошибкой)
            })
    }, 
    [])

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (hasError) {
        return <div>Задача не найдена</div>
    }

    return (
        <div>
            <h1>{task.title}</h1>
            {task.isDone ? 'Задача выполнена' : 'Задача не выполнена'}
        </div>
    )
}

export default TasksPage