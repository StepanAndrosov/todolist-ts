import {Provider} from "react-redux";
import {AppRootState} from "../../app/store";
import React from "react";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoReducer} from "../../features/TodoLists/todoReducer";
import {tasksReducer} from "../../features/TodoLists/tasksReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";
import {appReducer} from "../../app/app-reduser";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todoReducer,
    tasks: tasksReducer,
    app: appReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: "what to learn", filter: "all", addedDate: "", order: 0, entityStatus: 'idle'},
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
        status: 'idle',
        error: null
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))
export const ReduxStoreDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}> {storyFn()}</Provider>
}
