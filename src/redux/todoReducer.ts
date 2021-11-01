import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";

type RemoveTodolistAT = {
    id: string
    type: "REMOVE-TODOLIST"
}
type AddTodolistAT = {
    type: "ADD-TODOLIST",
    title: string
}
type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}
type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValuesType
    id: string
}
type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todoReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [...state,
            {id: v1(), title: action.title, filter: 'all'}]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            throw new Error(`i can't read this action`)
    }
}
export const RemoveTodoListAC = (todolistId: string): RemoveTodolistAT => {
    return  {type: "REMOVE-TODOLIST", id: todolistId}
}
export const AddTodoListAC = (title: string): AddTodolistAT => {
    return  {type: "ADD-TODOLIST", title}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return  {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return  {type: "CHANGE-TODOLIST-FILTER", id, filter}
}