import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {Dispatch} from "redux";

type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodolistsAC>

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todoReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
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
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}
export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodoListAC = (title: string) => ({type: "ADD-TODOLIST", title, todolistId: v1()} as const)
export const changeTodoListTitleAC = (id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title
} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
     todolistsAPI.getTodolists()
        .then(res => {
            const action = setTodolistsAC(res.data)
            dispatch(action)
        })
}
