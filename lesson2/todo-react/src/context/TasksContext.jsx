import { createContext } from "react";
import useTasks from "../hooks/useTasks"; 
import useIncompleteTaskScroll from "../hooks/useIncompleteTaskScroll";
export const TasksContext = createContext({}) // начальное значение - пустой объект, в котором будет храниться массив задач и функция для их изменения


export const TasksProvider = (props) => {
    const {children} = props
    console.log('компонент ToDo отрендерился')
    const {
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
    } = useTasks() 

    const {
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    } = useIncompleteTaskScroll(tasks) // получаем из хука ссылку на первую незавершенную задачу и ее id, передавая в него массив задач
    return (
        <TasksContext.Provider 
            value={{ 
                tasks,
                filteredTasks,
                firstIncompleteTaskRef,
                firstIncompleteTaskId,
                deleteTask,
                toggleTaskComplete,
                deleteAllTasks,
                addTask,
                newTaskInputRef,
                newTaskTitle,
                setNewTaskTitle,
                searchQuery,
                setSearchQuery
            }} // перечисляем все значения, которые хотим передать через контекст. В провайдер оборачивается все дерево компонентов, которым передаем эти значения. Теперь любой компонент внутри этого провайдера может получить доступ к этим значениям, используя хук useContext(TasksContext) и указав нужное значение из объекта, который мы передали в value.
        >
            {children}
        </TasksContext.Provider>
    )
}