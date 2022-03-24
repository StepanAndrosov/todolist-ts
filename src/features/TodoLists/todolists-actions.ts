// thunks
import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reduser";
import {todolistsAPI} from "../../api/todolistsAPI";
import {handleServerNetworkError} from "../../utils/error-utils";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";

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
