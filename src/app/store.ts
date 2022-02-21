import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/TodoLists/tasksReducer";
import {todoReducer} from "../features/TodoLists/todoReducer";
import {appReducer} from "./app-reduser";
import thunk from "redux-thunk";



const rootReducer = combineReducers({
    todolists: todoReducer,
    tasks: tasksReducer,
    app: appReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
