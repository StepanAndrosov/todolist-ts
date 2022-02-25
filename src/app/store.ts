import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/TodoLists/tasks-reducer";
import {todoReducer} from "../features/TodoLists/todo-reducer";
import {appReducer} from "./app-reduser";
import thunk from "redux-thunk";
import {authReducer} from "../features/Login/auth-reducer";



const rootReducer = combineReducers({
    todolists: todoReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
