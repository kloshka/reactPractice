import {useState, useEffect, useRef, useCallback, useMemo, useReducer} from 'react'
import tasksAPI from "@/shared/api/tasks" // импортируем API для работы с задачами, чтобы использовать его методы для получения, добавления, удаления и изменения задач на сервере.


// Редьюсер - это функция, которая принимает текущее состояние и действие, и возвращает новое состояние на основе этих данных.
// STATE - это объект, который хранит данные и состояние нашего приложения. Он может содержать любые данные, которые нам нужны для 
// работы приложения, например, массив задач, строку поискового запроса, id задачи, которая сейчас исчезает или появляется и т.д.

// ACTION - это объект, который описывает действие, которое произошло в приложении.
//  Он обычно содержит тип действия и любые данные, которые нужны для его выполнения. 
// Например, действие может быть "ADD_TASK" с данными новой задачи, или "DELETE_TASK" с данными id удаляемой задачи.
// Гарантированно есть только type, остальные поля могут быть любыми, в зависимости от того, какие данные нужны для выполнения этого действия.
const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ALL': {
            return Array.isArray(action.tasks) ? action.tasks : state
        } // действие для установки всех задач, полученных с сервера. При загрузке данных при первом рендере компонента.
        case 'ADD': {
            return [...state, action.task] // действие для добавления новой задачи. При добавлении новой задачи.
        }
        case 'TOGGLE_COMPLETE': {
            const {id, isDone} = action
            return state.map((item) => {
                if (item.id === id){
                    return {...item, isDone}
                }
                return item
            }) // действие для изменения статуса задачи (выполнена/не выполнена). При переключении статуса задачи.
        }
        case 'DELETE': {
            return state.filter((task) => task.id !== action.id) // действие для удаления задачи. При удалении задачи.
        }
        case 'DELETE_ALL': {
            return [] // действие для удаления всех задач. При удалении всех задач.
        }
        default: {
            return state // если тип действия не распознан, возвращаем текущее состояние без изменений.
        }

    }
} 

const useTasks = () => {
    const [disappearingTaskId, setDisappearingTaskId] = useState(null) // для хранения id задачи, которая сейчас исчезает. Изначально null, так как никакая задача не исчезает.
    const [appearingTaskId, setAppearingTaskId] = useState(null) // для хранения id задачи, которая сейчас появляется. Изначально null, так как никакая задача не появляется.



    const newTaskInputRef = useRef(null) // для получения доступа к DOM-элементу поля ввода новой задачи. Изначально ссылка указывает на null.
    // console.log(newTaskInputRef) 
    // setTimeout(() => {
    //     console.log(newTaskInputRef) 
    // }, 1000);
    useEffect(() => {
        newTaskInputRef.current.focus() // устанавливаем фокус на поле ввода новой задачи при первом рендере компонента
    }, [])
    const [searchQuery, setSearchQuery] = useState('') // для хранения значения поля ввода поиска задач. Изначально оно пустое.

    const [tasks, dispatch] = useReducer(tasksReducer, [])

    const renderCount = useRef(0) // для хранения количества рендеров компонента. Изначально 0.
    useEffect(() => {
        renderCount.current += 1 // увеличиваем счетчик рендеров при каждом рендере компонента
        // console.log(`Компонент todo отрендерился ${renderCount.current} раза`) // выводим количество рендеров в консоль
    }) // без второго аргумента эффект будет выполняться при каждом рендере компонента. 
    // Если бы мы передали пустой массив в качестве второго аргумента, эффект бы выполнялся только при первом рендере компонента.
    
    
    
    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase()
        return clearSearchQuery.length > 0 
            ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) // фильтруем задачи по поисковому запросу, игнорируя регистр
            : null 
    }, [searchQuery, tasks])

 // если поисковый запрос пустоq
    // если сейчас мы поменяем tasks, то при следующем обновлении интерфейса, tasks снова будет равно этому массиву. И изменения не сохранятся. 
    // Поэтому нам нужно сохранить tasks в состоянии компонента, чтобы при его обновлении сохранять изменения. Для этого мы используем хук useState.
    // при изменении состояния react сам запускает перерисовку компонента
    // const [value, setValue] = useState(initialValue) //useState возвращает массив из 2 элементов: текущее значение и функцию для его обновления.
    //initialValue - это начальное значение, которое будет присвоено value при первом рендере ыкомпонента.
    // value Нельзя изменять напрямую, нужно использовать setValue для обновления значения.
    //  Это гарантирует, что React знает о изменении и может правильно обновить интерфейс.
    // хуки можно вызывать только в теле функции компонента (до return) или внутри собственных хуков. 
    // Нельзя вызывать хуки в условных операторах, циклах или вложенных функциях. В jsx нельзя

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = window.confirm('Вы уверены, что хотите удалить все задачи?')
        if (isConfirmed) {
            tasksAPI.deleteAll(tasks)
                .then(() => {
                    dispatch({ type: 'DELETE_ALL' })
                }) // после успешного удаления всех задач с сервера, устанавливаем пустой массив в состояние tasks, чтобы обновить интерфейс и отобразить, что все задачи удалены
        }
    }
    , [tasks])

    const deleteTask = useCallback( (taskId) => {
        tasksAPI.delete(taskId)
            .then(() => {
                setDisappearingTaskId(taskId) // устанавливаем id удаляемой задачи 
                // в состояние disappearingTaskId, чтобы запустить анимацию исчезновения для этой задачи
                setTimeout(() => {
                    dispatch({ type: 'DELETE', id: taskId })
                    setDisappearingTaskId(null) // сбрасываем id только после удаления из списка
                }, 400)
            })
    }, [])

    const toggleTaskComplete = useCallback((taskId, isDone) => {

    tasksAPI.toggleComplete(taskId, isDone)
        .then(() => {
            dispatch({type: "TOGGLE_COMPLETE", id: taskId, isDone})
    }, [])})


    const addTask = useCallback((title, callbackAfterAdd) => {
        // const newTaskTitle = newTaskInputRef.current.value // current Обязателен
        const newTask = {
            title: title,
            isDone: false,
        }
        tasksAPI.add(newTask)
            .then((addedTask) => {
                dispatch({ type: 'ADD', task: addedTask }) // добавляем новую задачу в массив задач
                callbackAfterAdd() // вызываем колбэк после добавления задачи, чтобы очистить поле ввода и обновить интерфейс
                // newTaskInputRef.current.value = '' // очищаем поле ввода после добавления задачи, используя ссылку
                setSearchQuery('') // очищаем поисковый запрос после добавления задачи, чтобы новая задача отображалась в списке задач.
                newTaskInputRef.current.focus() // устанавливаем фокус на поле ввода новой задачи после добавления задачи, используя ссылку
                setAppearingTaskId(addedTask.id) // устанавливаем id новой задачи в состояние appearingTaskId, чтобы запустить анимацию появления
                setTimeout(() => {
                    setAppearingTaskId(null) // сбрасываем id новой задачи через 400 мс, чтобы удалить класс анимации появления
                }, 400)
            })
    }, [])

    useEffect(() => {
        newTaskInputRef.current.focus()
        tasksAPI.getAll().then((data) => {
            dispatch({ type: 'SET_ALL', tasks: data }) // устанавливаем полученные с сервера задачи в состояние tasks, чтобы отобразить их в интерфейсе
            console.log(data)
        })
    }, [])

    //пустой массив зависимостей означает, что эффект будет выполнен только один раз при первом рендере компонента. 
    // Это полезно для выполнения инициализационных задач, таких как загрузка данных или настройка подписок.



    // const memoizedFn = useCallback(() => {
    //     console.log('я мемоизированная функция') // useCallback возвращает мемоизированную версию функции, которая сохраняет ссылочную целостность между рендерами, если зависимости не изменились. 
    // }, []) // пока зависимости не изменятся, ссылка на функцию будет сохраняться, и она не будет пересоздаваться при каждом рендере компонента. 
    // // Это может быть полезно для оптимизации производительности, особенно при передаче функции в дочерние компоненты, которые зависят от нее и могут избегать ненужных рендеров.
    return {
        tasks,
        filteredTasks,
        deleteTask,
        toggleTaskComplete,
        deleteAllTasks,
        addTask,
        newTaskInputRef,
        searchQuery,
        setSearchQuery,
        disappearingTaskId,
        appearingTaskId
    }
    }

export default useTasks