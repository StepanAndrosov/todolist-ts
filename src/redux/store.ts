import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoReducer} from "./todoReducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    todolists: todoReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
