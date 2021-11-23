import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoReducer} from "./todoReducer";


const rootReducer = combineReducers({
    todolists: todoReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store