import {Provider} from "react-redux";
import React from "react";
import {combineReducers} from "redux";

import {tasksReducer} from "../../features/TodoLists";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";
import thunk from "redux-thunk";
import {authReducer} from "../../features/Auth";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";
import {AppRootState, RootReducerType} from "../../features/Application/types";
import {appReducer} from "../../features/Application";
import {todolistsReducer} from "../../features/TodoLists/todolists-reducer";

const rootReducer: RootReducerType = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: "what to learn that I'll go to work and I'll be work in it technologies", filter: "all", addedDate: "", order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: "what to eat", filter: "all", addedDate: "", order: 0, entityStatus: 'loading'},
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: "HTML&CSS",
                status:
                TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Hi
            },
            {
                id: v1(), title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Hi
            },
        ],
        ['todolistId2']: []
    },
    app: {
        status: 'succeeded',
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
}

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(thunk)
})
export const ReduxStoreDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}> {storyFn()}</Provider>
}
export const BrowserRouterDecorator = (storyFn: () => React.ReactNode) => {
    return <HashRouter> {storyFn()}
    </HashRouter>
}
