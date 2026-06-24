import ToDo from "@/widgets/ToDo"
import { TasksProvider } from "@/entities/todo"

const TasksPage = () => {
    return (
        <TasksProvider>
            <ToDo />
        </TasksProvider>
    )
}

export default TasksPage