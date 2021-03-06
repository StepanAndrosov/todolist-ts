import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsAPI, TodolistType} from "../../api/todolistsAPI";
import {RequestStatusType, ThunkError} from "../Application/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError,} from "../../utils/error-utils";
import {setAppStatus} from "../Application/ApplicationCommonAction";
import {FilterValuesType, TodolistDomainType} from "./types";

const initialState: Array<TodolistDomainType> = []

const fetchTodolists = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkError>('todolists/fetchTodoLists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})
const removeTodoList = createAsyncThunk<{ id: string }, string, ThunkError>('todolists/removeTodoLists', async (id, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({id, status: 'loading'}))
    await todolistsAPI.deleteTodolist(id)
    dispatch(setAppStatus({status: 'succeeded'}))
    return {id}
})
const addTodoList = createAsyncThunk<{ todolist: TodolistType }, string, ThunkError>
('todolists/addTodoLists', async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI, false)
    }
})
const changeTodoListTitle = createAsyncThunk('todolists/changeTodoListTitle',
    async (param: { id: string, title: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await todolistsAPI.updateTodolist(param.id, param.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
                return {id: param.id, title: param.title}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error: any) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    })


export const slice = createSlice({
        name: "todolists",
        initialState: initialState,
        reducers: {
            changeTodoListFilter(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].filter = action.payload.filter
            },
            changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
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

const {changeTodolistEntityStatus} = slice.actions

export const asyncActions = {
    fetchTodolists,
    removeTodoList,
    addTodoList,
    changeTodoListTitle,
}
