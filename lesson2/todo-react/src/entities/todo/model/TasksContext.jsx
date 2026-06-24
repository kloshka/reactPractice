import { createContext } from "react";
import useTasks from "./useTasks"; 
import { useMemo } from "react";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";
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
        searchQuery,
        setSearchQuery,        
        disappearingTaskId,
        appearingTaskId
    } = useTasks() 

    const {
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    } = useIncompleteTaskScroll(tasks) // получаем из хука ссылку на первую незавершенную задачу и ее id, передавая в него массив задач
    
    const value = useMemo(() => ({ 
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
        appearingTaskId,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
     }), [
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
        appearingTaskId,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
     ])      
    return (
        <TasksContext.Provider 
            value={value} // перечисляем все значения, которые хотим передать через контекст. В провайдер оборачивается все дерево компонентов, которым передаем эти значения. Теперь любой компонент внутри этого провайдера может получить доступ к этим значениям, используя хук useContext(TasksContext) и указав нужное значение из объекта, который мы передали в value.
        >
            {children}
        </TasksContext.Provider>
    )
}