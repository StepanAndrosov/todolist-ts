import {addTodoListAC, removeTodolistAC, setTodolistsAC} from "./todoReducer";
import {TaskModelType, TaskType, todolistsAPI} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TaskStateType = {}

type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = state[action.todoListId].filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            stateCopy[action.task.todoListId] = [action.task, ...stateCopy[action.task.todoListId]]
            return stateCopy
        }
        case "UPDATE-TASK": {
            const tasks = state[action.todoListId]
            state[action.todoListId] = tasks.map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)
            return {...state}
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = []
            return {...stateCopy}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return {...stateCopy}
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return {...stateCopy}
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {type: "REMOVE-TASK", taskId, todoListId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: "ADD-TASK", task} as const
}
export const updateTaskAC = (todoListId: string, taskId: string, domainModel: UpdateTaskModelType) => {
    return {type: "UPDATE-TASK", taskId, todoListId, domainModel} as const
}
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: "SET-TASKS", todolistId, tasks} as const
}
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            const action = setTasksAC(todolistId, res.data.items)
            dispatch(action)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            }
        })
}
export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
            }
        })
}
export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskModelType) => (dispatch: Dispatch, getState: () => AppRootState) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        console.warn("task not found in the state")
        return
    }
    const model: TaskModelType = {
        status: task.status,
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...domainModel
    }
    todolistsAPI.updateTask(todolistId, taskId, model)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, model))
            }
        })
}
