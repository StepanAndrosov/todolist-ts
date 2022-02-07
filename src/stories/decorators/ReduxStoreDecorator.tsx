import {Provider} from "react-redux";
import {AppRootState} from "../../app/store";
import React from "react";
import {combineReducers, createStore} from "redux";
import {todoReducer} from "../../features/TodoLists/todoReducer";
import {tasksReducer} from "../../features/TodoLists/tasksReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";

const rootReducer = combineReducers({
    todolists: todoReducer,
    tasks: tasksReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: "what to learn", filter: "all", addedDate: "", order: 0},
    ]
    ,
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
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState)

export const ReduxStoreDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}> {storyFn()}</Provider>
}
