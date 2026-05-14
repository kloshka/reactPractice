import {useRef} from 'react'

const useIncompleteTaskScroll = (tasks) => {
    const firstIncompleteTaskRef = useRef(null) 
    const firstIncompleteTaskId = tasks.find((item) => !item.isDone)?.id     // находим первую незавершенную задачу
    return {
        firstIncompleteTaskRef,
        firstIncompleteTaskId  
    }
}

export default useIncompleteTaskScroll