import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "../features/TodoLists"
import {authReducer} from "../features/Auth";
import {appReducer} from "../features/Application";
import {todolistsReducer} from "../features/TodoLists/todolists-reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunk)
})

// @ts-ignore
window.store = store

