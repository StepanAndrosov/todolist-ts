import {Provider} from "react-redux";
import {AppRootState} from "../../redux/store";
import React from "react";
import {combineReducers, createStore} from "redux";
import {todoReducer} from "../../redux/todoReducer";
import {tasksReducer} from "../../redux/tasksReducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todolists: todoReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: "what to learn", filter: "all"},
        {id: 'todolistId2', title: "what to buy", filter: "all"}
    ]
    ,
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        ['todolistId2']: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreDecorator = ( storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}> { storyFn()}</Provider>
}
