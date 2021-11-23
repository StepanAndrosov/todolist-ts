import {v1} from "uuid";
import { TaskStateType} from "../AppWithRedux";
import {AddTodolistAT, RemoveTodolistAT} from "./todoReducer";

type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}
type AddTaskAT = {
    type: "ADD-TASK",
    title: string
    todoListId: string
}
type ChangeTaskStatusAT= {
    type: "CHANGE-TASK-STATUS",
    taskId: string
    todoListId: string
    isDone: boolean
}
type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    todoListId: string
    title: string
}

const initialState: TaskStateType = {

}

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = state[action.todoListId].filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const task = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todoListId] = [task, ...stateCopy[action.todoListId]]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = tasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)

            return {...stateCopy}
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            const task = stateCopy[action.todoListId].find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return {...stateCopy}
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []
            return {...stateCopy}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return {...stateCopy}
        }
        default:
        return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskAT => {
    return {type: "REMOVE-TASK", taskId, todoListId}
}
export const addTaskAC = (title: string, todoListId: string): AddTaskAT => {
    return {type: "ADD-TASK", title, todoListId}
}
export const changeTaskStatusAC = (taskId: string, todoListId: string, isDone: boolean): ChangeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskId, todoListId, isDone}
}
export const changeTaskTitleAC = (taskId: string, todoListId: string, title: string): ChangeTaskTitleAT => {
    return {type: "CHANGE-TASK-TITLE", taskId, todoListId, title}
}
