import {todolistsAPI, TodolistType} from "../../api/todolistsAPI";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reduser";
import {handleServerNetworkError} from "../../utils/error-utils";

const initialState: Array<TodolistDomainType> = []

export const todoReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) =>
    ({type: "REMOVE-TODOLIST", id} as const)
export const addTodoListAC = (todolist: TodolistType) =>
    ({type: "ADD-TODOLIST", todolist} as const)
export const changeTodoListTitleAC = (id: string, title: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", id, title} as const)
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: "CHANGE-TODOLIST-FILTER", id, filter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const)

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC({status:'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkError(error.message ? error.message : 'some error occurred', dispatch)
        })
}
export const removeTodoListTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    dispatch(changeTodolistEntityStatusAC(id,'loading'))
    todolistsAPI.deleteTodolist(id)
        .then(() => {
            dispatch(removeTodolistAC(id))
            dispatch(setAppStatusAC({status:'succeeded'}))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
            dispatch(setAppStatusAC({status:'succeeded'}))
        })
}
export const changeTodoListTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    todolistsAPI.updateTodolist(id, title)
        .then(() => {
            dispatch(changeTodoListTitleAC(id, title))
            dispatch(setAppStatusAC({status:'succeeded'}))
        })
}

// types
type ActionsType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

