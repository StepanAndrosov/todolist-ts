import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from "redux";
import {tasksReducer} from "../features/TodoLists/tasks-reducer";
import {todolistsReducer} from "../features/TodoLists/todolists-reducer";
import {appReducer} from "./app-reduser";
import thunk from "redux-thunk";
import {authReducer} from "../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useMemo} from "react";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
export type RootReducerType = typeof rootReducer
export type AppRootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunk)
})

// @ts-ignore
window.store = store

type AppDispatchType = typeof store.dispatch

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [actions, dispatch])

    return boundActions
}
export const useAppDispatch = () => useDispatch<AppDispatchType>()
