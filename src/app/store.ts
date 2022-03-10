import { combineReducers} from "redux";
import {tasksReducer} from "../features/TodoLists/tasks-reducer";
import {todoReducer} from "../features/TodoLists/todo-reducer";
import {appReducer} from "./app-reduser";
import thunk from "redux-thunk";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolists: todoReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
export type AppRootState = ReturnType<typeof rootReducer>
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunk)
})

// @ts-ignore
window.store = store
