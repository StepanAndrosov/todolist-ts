import {todolistsAPI, TodolistType} from "../../api/todolistsAPI";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reduser";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
        name: "todolists",
        initialState: initialState,
        reducers: {
            removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state.splice(index, 1)
            },
            addTodoListAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            },
            changeTodoListTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].title = action.payload.title
            },
            changeTodoListFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].filter = action.payload.filter
            },
            setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            },
            changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].entityStatus = action.payload.status
            },
        }
    }
)
export const todoReducer = slice.reducer
export const {
    removeTodolistAC,
    addTodoListAC,
    changeTodoListTitleAC,
    changeTodoListFilterAC,
    setTodolistsAC,
    changeTodolistEntityStatusAC
} = slice.actions

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkError(error.message ? error.message : 'some error occurred', dispatch)
        })
}
export const removeTodoListTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id, status: 'loading'}))
    todolistsAPI.deleteTodolist(id)
        .then(() => {
            dispatch(removeTodolistAC({id}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodoListAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const changeTodoListTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.updateTodolist(id, title)
        .then(() => {
            dispatch(changeTodoListTitleAC({id, title}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}

// types
export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

