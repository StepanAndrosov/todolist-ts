import {addTodoListAC, removeTodolistAC, setTodolistsAC} from "./todo-reducer";
import {TaskModelType, TaskType, todolistsAPI} from "../../api/todolistsAPI";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import { SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../../app/app-reduser";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
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
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (todoListId: string, taskId: string) =>
    ({type: "REMOVE-TASK", taskId, todoListId} as const)

export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", task} as const)

export const updateTaskAC = (todoListId: string, taskId: string, domainModel: UpdateTaskModelType) =>
    ({type: "UPDATE-TASK", taskId, todoListId, domainModel} as const)

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: "SET-TASKS", todolistId, tasks} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusAT>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            }
        })
}
export const addTaskTC = (todoListId: string, title: string) =>
    (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTask(todoListId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error.message ? error.message : 'some error occurred' , dispatch)
            })
    }
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateTaskModelType) =>
    (dispatch: ThunkDispatchType, getState: () => AppRootState) => {
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
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error.message ? error.message : 'some error occurred' , dispatch)
            })
    }

// types
export type ThunkDispatchType = Dispatch<ActionsType | SetAppStatusAT | SetAppErrorAT>

export type TaskStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>

export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
