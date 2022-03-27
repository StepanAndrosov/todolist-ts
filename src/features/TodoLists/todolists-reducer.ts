import {todolistsAPI, TodolistType} from "../../api/todolistsAPI";
import {RequestStatusType, setAppStatus} from "../../app/app-reduser";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";

const initialState: Array<TodolistDomainType> = []

const fetchTodolists = createAsyncThunk('todolists/fetchTodoLists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error: any) {
        handleServerNetworkError(error.message ? error.message : 'some error occurred', thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})
const removeTodoList = createAsyncThunk('todolists/removeTodoLists', async (id: string, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({id, status: 'loading'}))
    await todolistsAPI.deleteTodolist(id)
    dispatch(setAppStatus({status: 'succeeded'}))
    return {id}
})
const addTodoList = createAsyncThunk('todolists/addTodoLists', async (title: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }
    } catch (error: any) {
        const err: AxiosError = error
        handleServerNetworkError(err.message ? err.message : 'some error occurred', dispatch)
        return rejectWithValue({})
    }

})
export const changeTodoListTitle = createAsyncThunk('todolists/changeTodoListTitle', async (param: { id: string, title: string }, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    await todolistsAPI.updateTodolist(param.id, param.title)
    dispatch(setAppStatus({status: 'succeeded'}))
    return {id: param.id, title: param.title}

})

export const asyncActions = {
    fetchTodolists,
    removeTodoList,
    addTodoList,
    changeTodoListTitle
}

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
export const todolistsReducer = slice.reducer
export const {
    changeTodoListFilter,
    changeTodolistEntityStatus
} = slice.actions

// types
export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

