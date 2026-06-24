const useTasksLocalStorage = () => {
    const savedTasks = localStorage.getItem('tasks') // пытаемся получить сохраненные задачи из localStorage    
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks)) // сохраняем tasks в localStorage при каждом изменении tasks
    }
    return { 
        savedTasks: savedTasks ? JSON.parse(savedTasks) : null, // если сохраненные задачи есть, парсим их из JSON и возвращаем, иначе возвращаем пустой массив
        saveTasks }
}
export default useTasksLocalStorage