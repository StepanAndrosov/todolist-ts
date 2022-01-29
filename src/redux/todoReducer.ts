import {v1} from "uuid";
import {TodolistType} from "../api/todolistsAPI";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    todoListId: string
}
export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}
type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}
type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}
type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todoReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todoListId)
        }
        case "ADD-TODOLIST": {
            return [
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0
                }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}
export const removeTodolistAC = (todoListId: string): RemoveTodolistAT => {
    return {type: "REMOVE-TODOLIST", todoListId}
}
export const addTodoListAC = (title: string): AddTodolistAT => {
    return  {type: "ADD-TODOLIST", title, todolistId: v1()}
}
export const changeTodoListTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return  {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return  {type: "CHANGE-TODOLIST-FILTER", id, filter}
}
