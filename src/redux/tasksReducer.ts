import {v1} from "uuid";

import {addTodoListAC, removeTodolistAC, setTodolistsAC} from "./todoReducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolistsAPI";
import {Dispatch} from "redux";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TaskStateType = {}

type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
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
            stateCopy[action.todoListId] = [{
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todoListId,
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            }, ...stateCopy[action.todoListId]]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const tasks = state[action.todoListId]
            state[action.todoListId] = tasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            return {...state}
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return {...stateCopy}
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
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

export const removeTaskAC = (taskId: string, todoListId: string) => {
    return {type: "REMOVE-TASK", taskId, todoListId} as const
}
export const addTaskAC = (title: string, todoListId: string) => {
    return {type: "ADD-TASK", title, todoListId} as const
}
export const changeTaskStatusAC = (taskId: string, todoListId: string, status: TaskStatuses) => {
    return {type: "CHANGE-TASK-STATUS", taskId, todoListId, status} as const
}
export const changeTaskTitleAC = (taskId: string, todoListId: string, title: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, todoListId, title} as const
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
