import Router from "./Router"
import TasksPage from "./pages/TasksPage"
import TaskPage from "./pages/TaskPage"
const App = () => {
  const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
     "*": () => <h1>404 Not Found</h1>
  }
  return (
    <>
      <Router routes={routes}/>
    </>
  )
}

export default App
