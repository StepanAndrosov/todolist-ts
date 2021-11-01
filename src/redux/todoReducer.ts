import {v1} from "uuid";

type ActionsType = "REMOVE-TASK" | "INCREMENT-CHILDREN-COUNT" | "CHANGE-NAME"

type ActionType = {
    type: ActionsType
    [key: string]: any
}

export const todoReducer = (state: any, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return state
    }
}

// const removeTask = (id: string, todolistId: string) => {
//     const tasks = tasksObj[todolistId]
//     tasksObj[todolistId] = tasks.filter((item: { id: string; }) => item.id !== id)
//     setTasksObj({...tasksObj})
// }

// const addTask = (title: string, todolistId: string) => {
//     const task = {id: v1(), title: title, isDone: false}
//     const tasks = tasksObj[todolistId]
//     tasksObj[todolistId] = [task, ...tasks]
//     setTasksObj({...tasksObj})
// }

// const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
//     const tasks = tasksObj[todolistId]
//     const task = tasks.find(t => t.id === taskId)
//     if (task) {
//         task.isDone = isDone
//         setTasksObj({...tasksObj})
//     }
// }
// const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
//     const tasks = tasksObj[todolistId]
//     const task = tasks.find(t => t.id === taskId)
//     if (task) {
//         task.title = newTitle
//         setTasksObj({...tasksObj})
//     }
// }