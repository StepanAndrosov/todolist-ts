import {addTodoList, fetchTodolists, removeTodoList} from "./todo-reducer";
import {TaskModelType, TaskType, todolistsAPI} from "../../api/todolistsAPI";
import {AppRootState} from "../../app/store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reduser";

const initialState: TaskStateType = {}

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
const slice = createSlice({
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

export const tasksReducer = slice.reducer
// types
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
