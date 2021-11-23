import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../AppWithRedux";

export type RemoveTodolistAT = {
    todoListId: string
    type: "REMOVE-TODOLIST"
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

const initialState: Array<TodoListType> = []

export const todoReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todoListId)
        }
        case "ADD-TODOLIST": {
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
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