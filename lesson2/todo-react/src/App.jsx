import Greeting from "./components/Greeting"
import ToDo from "./components/ToDo"
import { TasksProvider } from "./context/TasksContext"
const App = () => {
  return (
    <>
     <TasksProvider>
      <ToDo />
     </TasksProvider>
      {/*
        <Greeting name="Вася" />
        <Greeting name="Саша" />
      */}
    </>
  )
}

export default App
