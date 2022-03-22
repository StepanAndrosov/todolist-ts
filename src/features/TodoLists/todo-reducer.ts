import {todolistsAPI, TodolistType} from "../../api/todolistsAPI";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reduser";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []
// thunks
export const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error: any) {
        handleServerNetworkError(error.message ? error.message : 'some error occurred', thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})
export const removeTodoList = createAsyncThunk('todolists/removeTodolists', async (id: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id, status: 'loading'}))
    await todolistsAPI.deleteTodolist(id)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {id}
})

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

const slice = createSlice({
        name: "todolists",
        initialState: initialState,
        reducers: {
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
        }
    }
)
export const todoReducer = slice.reducer
export const {
    addTodoListAC,
    changeTodoListTitleAC,
    changeTodoListFilterAC,
    changeTodolistEntityStatusAC
} = slice.actions


// types
export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

