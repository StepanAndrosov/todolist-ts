import {createAsyncThunk} from "@reduxjs/toolkit";
import {TaskModelType, todolistsAPI} from "../../api/todolistsAPI";
import {AppRootState} from "../../app/store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reduser";
import {UpdateTaskModelType} from "./tasks-reducer";

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todoListId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todoListId)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return {todoListId, tasks: res.data.items}
})
export const removeTask = createAsyncThunk('tasks/removeTask', async (param: { todoListId: string, taskId: string }) => {
    await todolistsAPI.deleteTask(param.todoListId, param.taskId)
    return {todoListId: param.todoListId, taskId: param.taskId}
})
export const addTask = createAsyncThunk('tasks/addTask',
    async (param: { todoListId: string, title: string },
           {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.createTask(param.todoListId, param.title)
        try {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return res.data.data.item
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue({})
            }
        } catch (error: any) {
            handleServerNetworkError(error.message ? error.message : 'some error occurred', dispatch)
            return rejectWithValue({})
        }
    })
export const updateTask = createAsyncThunk('tasks/updateTask',
    async (param: { todoListId: string, taskId: string, domainModel: UpdateTaskModelType },
           {dispatch, rejectWithValue, getState}) => {
        const state = getState() as AppRootState
        const task = state.tasks[param.todoListId].find(t => t.id === param.taskId)
        if (!task) {
            return rejectWithValue("task not found in the state")
        }
        const model: TaskModelType = {
            status: task.status,
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...param.domainModel
        }
        const res = await todolistsAPI.updateTask(param.todoListId, param.taskId, model)
        try {
            if (res.data.resultCode === 0) {
                return param
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue({})
            }
        } catch (error: any) {
            handleServerNetworkError(error.message ? error.message : 'some error occurred', dispatch)
            return rejectWithValue({})
        }
    })
