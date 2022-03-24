import {TodolistType} from "../../api/todolistsAPI";
import {RequestStatusType} from "../../app/app-reduser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoList, changeTodoListTitle, fetchTodolists, removeTodoList} from "./todolists-actions";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
        name: "todolists",
        initialState: initialState,
        reducers: {
            changeTodoListFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].filter = action.payload.filter
            },
            changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].entityStatus = action.payload.status
            },
        },
        extraReducers: builder => {
            builder.addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            builder.addCase(removeTodoList.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state.splice(index, 1)
            })
            builder.addCase(addTodoList.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            builder.addCase(changeTodoListTitle.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].title = action.payload.title
            })
        }
    }
)
export const todolistsReducer = slice.reducer
export const {
    changeTodoListFilterAC,
    changeTodolistEntityStatusAC
} = slice.actions

// types
export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

