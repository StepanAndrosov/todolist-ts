import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TaskModelType, TaskType, todolistsAPI} from "../../api/todolistsAPI";
import {AppRootState, ThunkError} from "../Application/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {setAppStatus} from "../Application/ApplicationCommonAction";
import {TaskStateType, UpdateTaskModelType} from "./types";
import {todoListsActions} from './todolists-index'

const {addTodoList, fetchTodolists, removeTodoList} = todoListsActions
const initialState: TaskStateType = {}

const fetchTasks = createAsyncThunk<{todoListId: string, tasks: TaskType[]}, string, ThunkError>('tasks/fetchTasks', async (todoListId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(todoListId)
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todoListId, tasks: res.data.items}
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }

})
const removeTask = createAsyncThunk<{todoListId: string, taskId: string}, { todoListId: string, taskId: string }, ThunkError>('tasks/removeTask', async (param) => {
    await todolistsAPI.deleteTask(param.todoListId, param.taskId)
    return {todoListId: param.todoListId, taskId: param.taskId}
})
const addTask = createAsyncThunk<TaskType, { todoListId: string, title: string }, ThunkError>
('tasks/addTask', async (param,
                         thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await todolistsAPI.createTask(param.todoListId, param.title)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return res.data.data.item
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
const updateTask = createAsyncThunk('tasks/updateTask',
    async (param: { todoListId: string, taskId: string, domainModel: UpdateTaskModelType },
           thunkAPI) => {
        const state = thunkAPI.getState() as AppRootState
        const task = state.tasks[param.todoListId].find(t => t.id === param.taskId)
        if (!task) {
            return thunkAPI.rejectWithValue("task not found in the state")
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
                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }
        } catch (error: any) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    })

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask
}
export const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodoList.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(removeTodoList.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todoListId] = action.payload.tasks
        })
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        })
    }
})
