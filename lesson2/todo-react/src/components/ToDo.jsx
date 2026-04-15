import AddTaskForm from "./AddTaskForm"
import SearchTaskForm from "./SearchTaskForm"
import ToDoInfo from "./ToDoInfo"
import ToDoList from "./ToDoList"

import {useState, useEffect, use} from 'react' //такие функции называют хуками.
const ToDo = () => {
    const [newTaskTitle, setNewTaskTitle] = useState('') // для хранения значения поля ввода новой задачи. Изначально оно пустое.

    const [searchQuery, setSearchQuery] = useState('') // для хранения значения поля ввода поиска задач. Изначально оно пустое.

    const [tasks, setTasks] = useState(() =>{
        const savedTasks = localStorage.getItem('tasks') // пытаемся получить сохраненные задачи из localStorage    
        return savedTasks ? JSON.parse(savedTasks) : [
                    [
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
        ] // если сохраненные задачи есть, парсим их из JSON и возвращаем, иначе возвращаем пустой массив
    }
    )

    const clearSearchQuery = searchQuery.trim().toLowerCase()
    const filteredTasks = clearSearchQuery.length > 0 // не храним как отдельный state, так как он зависит от searchQuery и tasks. 

        ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) // фильтруем задачи по поисковому запросу, игнорируя регистр
        : null // если поисковый запрос пустоq
    // если сейчас мы поменяем tasks, то при следующем обновлении интерфейса, tasks снова будет равно этому массиву. И изменения не сохранятся. 
    // Поэтому нам нужно сохранить tasks в состоянии компонента, чтобы при его обновлении сохранять изменения. Для этого мы используем хук useState.
    // при изменении состояния react сам запускает перерисовку компонента
    // const [value, setValue] = useState(initialValue) //useState возвращает массив из 2 элементов: текущее значение и функцию для его обновления.
    //initialValue - это начальное значение, которое будет присвоено value при первом рендере ыкомпонента.
    // value Нельзя изменять напрямую, нужно использовать setValue для обновления значения.
    //  Это гарантирует, что React знает о изменении и может правильно обновить интерфейс.
    // хуки можно вызывать только в теле функции компонента (до return) или внутри собственных хуков. 
    // Нельзя вызывать хуки в условных операторах, циклах или вложенных функциях. В jsx нельзя

    const deleteAllTasks = () => {
        const isConfirmed = window.confirm('Вы уверены, что хотите удалить все задачи?')
        if (isConfirmed) {
            setTasks([]) // удаляем все задачи, устанавливая пустой массив в состояние tasks
        }
    }

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((item) => item.id !== taskId))
    }

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(tasks.map((item) => {
            if (item.id === taskId) {
                return {...item, isDone} 
            }
            return item
        }))

    }


    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now.toString(), //генерирует уникальный id для новой задачи
                title: newTaskTitle,
                isDone: false,
            }
            setTasks([...tasks, newTask]) // добавляем новую задачу в массив задач
        }
        setNewTaskTitle('') // очищаем поле ввода после добавления задачи
        setSearchQuery('') // очищаем поисковый запрос после добавления задачи, чтобы новая задача отображалась в списке задач.
    }

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks)) // сохраняем tasks в localStorage при каждом изменении tasks
    }, [tasks]) 


    //пустой массив зависимостей означает, что эффект будет выполнен только один раз при первом рендере компонента. 
    // Это полезно для выполнения инициализационных задач, таких как загрузка данных или настройка подписок.
    return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm 
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ToDoInfo 
        total={tasks.length}
        done={tasks.reduce((acc, item) => item.isDone ? acc + 1 : acc, 0)}
        onDeleteAllButtonClick={deleteAllTasks}
      />  
      <ToDoList 
        tasks={tasks}
        filteredTasks={filteredTasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
       />
    </div>
    )
}

export default ToDo