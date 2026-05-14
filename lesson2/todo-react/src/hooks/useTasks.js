import {useState, useEffect, useRef, useCallback, useMemo} from 'react'
import useTasksLocalStorage from './useTasksLocalStorage'
const useTasks = () => {

    const {
        savedTasks,
        saveTasks
    } = useTasksLocalStorage()

    const [newTaskTitle, setNewTaskTitle] = useState('') // для хранения значения поля ввода новой задачи. Изначально оно пустое.

    const newTaskInputRef = useRef(null) // для получения доступа к DOM-элементу поля ввода новой задачи. Изначально ссылка указывает на null.
    // console.log(newTaskInputRef) 
    // setTimeout(() => {
    //     console.log(newTaskInputRef) 
    // }, 1000);
    useEffect(() => {
        newTaskInputRef.current.focus() // устанавливаем фокус на поле ввода новой задачи при первом рендере компонента
    }, [])
    const [searchQuery, setSearchQuery] = useState('') // для хранения значения поля ввода поиска задач. Изначально оно пустое.

    const [tasks, setTasks] = useState(savedTasks ?? [
            {
                id: 1,
                title: 'погладить кота',
                isDone: false,
            },  
            {
                id: 2,
                title: 'погладить собаку',
                isDone: true,
            }
        ] 
    )

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
            setTasks([]) // удаляем все задачи, устанавливая пустой массив в состояние tasks
        }
    }
    ,[])

    const deleteTask = useCallback( (taskId) => {
        setTasks(tasks.filter((item) => item.id !== taskId))
    }, [tasks])

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        setTasks(tasks.map((item) => {
            if (item.id === taskId) {
                return {...item, isDone} 
            }
            return item
        }))

    }, [tasks])


    const addTask = useCallback((title) => {
        // const newTaskTitle = newTaskInputRef.current.value // current Обязателен
        const newTask = {
            id: crypto?.randomUUID() ?? Date.now().toString(), //генерирует уникальный id для новой задачи
            title: title,
            isDone: false,
        }
        setTasks((prevTasks) => [...prevTasks, newTask]) // добавляем новую задачу в массив задач
        setNewTaskTitle('')
        // newTaskInputRef.current.value = '' // очищаем поле ввода после добавления задачи, используя ссылку
        setSearchQuery('') // очищаем поисковый запрос после добавления задачи, чтобы новая задача отображалась в списке задач.
        newTaskInputRef.current.focus() // устанавливаем фокус на поле ввода новой задачи после добавления задачи, используя ссылку
        
    }, [])

    useEffect(() => {
        saveTasks(tasks) // сохраняем задачи в localStorage при каждом изменении tasks
    }, [tasks]) 


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
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery
    }
}

export default useTasks