import {combineReducers} from "redux";
import {authReducer} from "../features/Auth";
import {appReducer} from "../features/Application";
import {todolistsReducer} from "../features/TodoLists";
import {tasksReducer} from "../features/TodoLists/Todolist";

export const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
})
