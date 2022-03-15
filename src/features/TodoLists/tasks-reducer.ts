import {addTodoListAC, removeTodolistAC, setTodolistsAC} from "./todo-reducer";
import {TaskModelType, TaskType, todolistsAPI} from "../../api/todolistsAPI";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reduser";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TaskStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string, domainModel: UpdateTaskModelType }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
        },
        setTasksAC(state, action: PayloadAction<{ todoListId: string, tasks: Array<TaskType> }>) {
            state[action.payload.todoListId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
    }
})
export const tasksReducer = slice.reducer
export const {
    removeTaskAC,
    addTaskAC,
    updateTaskAC,
    setTasksAC
} = slice.actions

// export const tasksReducer = (state: TaskStateType = initialState, action: any): TaskStateType => {
//     switch (action.type) {

//         case addTodoListAC.type:
//             return {...state, [action.payload.todolist.id]: []}
//         case "REMOVE-TODOLIST": {
//             const stateCopy = {...state}
//             delete stateCopy[action.id]
//             return {...stateCopy}
//         }
//         case setTodolistsAC.type: {
//             const stateCopy = {...state}
//             action.payload.todolists.forEach((tl: any) => {
//                 stateCopy[tl.id] = []
//             })
//             return {...stateCopy}
//         }
//         case "SET-TASKS":
//             return {...state, [action.todolistId]: action.tasks}
//         default:
//             return state
//     }
// }

// actions
// export const removeTaskAC = (todoListId: string, taskId: string) =>
//     ({type: "REMOVE-TASK", taskId, todoListId} as const)
//
// export const addTaskAC = (task: TaskType) =>
//     ({type: "ADD-TASK", task} as const)
//
// export const updateTaskAC = (todoListId: string, taskId: string, domainModel: UpdateTaskModelType) =>
//     ({type: "UPDATE-TASK", taskId, todoListId, domainModel} as const)
//
// export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
//     ({type: "SET-TASKS", todolistId, tasks} as const)

// thunks
export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTasks(todoListId)
        .then(res => {
            dispatch(setTasksAC({todoListId, tasks: res.data.items}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({todoListId, taskId}))
            }
        })
}
export const addTaskTC = (todoListId: string, title: string) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTask(todoListId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC({task: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error.message ? error.message : 'some error occurred', dispatch)
            })
    }
export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootState) => {
        const state = getState()
        const task = state.tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
            console.warn("task not found in the state")
            return
        }
        const model: TaskModelType = {
            status: task.status,
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistsAPI.updateTask(todoListId, taskId, model)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({todoListId, taskId, domainModel: model}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error.message ? error.message : 'some error occurred', dispatch)
            })
    }

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
