import {todolistsAPI, TodolistType} from "../../api/todolistsAPI";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reduser";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []
// thunks
export const fetchTodolists = createAsyncThunk('todolists/fetchTodoLists', async (param, thunkAPI) => {
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
export const removeTodoList = createAsyncThunk('todolists/removeTodoLists', async (id: string, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id, status: 'loading'}))
    await todolistsAPI.deleteTodolist(id)
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {id}
})
export const addTodoList = createAsyncThunk('todolists/addTodoLists', async (title: string, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTodolist(title)
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todolist: res.data.data.item}
})
export const changeTodoListTitle = createAsyncThunk('todolists/changeTodoListTitle', async (param: { id: string, title: string }, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    await todolistsAPI.updateTodolist(param.id, param.title)
    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {id: param.id, title: param.title}

})

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
export const todoReducer = slice.reducer
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

