import {Task} from "./Task";
import React from "react";
import {ReduxStoreDecorator} from "../../stories/decorators/ReduxStoreDecorator";
import {Meta} from "@storybook/react";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";


export default {
    title: "Todolist/Task comp",
    component: Task,
    decorators: [ReduxStoreDecorator]
} as Meta

export const TaskExample = () => {
    return <>
        <Task
            key={(Math.random() * 100).toString()}
            task={{
                id: '1',
                status: TaskStatuses.New,
                title: 'Reactive Technologies',
                todoListId: '1',
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            }}
            todolistId={(Math.random() * 100).toString()}
        />
        <Task
            key={(Math.random() * 100).toString()}
            task={{
                id: '2',
                status: TaskStatuses.Completed,
                title: 'Reactive Technologies',
                todoListId: '1',
                addedDate: '',
                order: 0,
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriorities.Low
            }}
            todolistId={(Math.random() * 100).toString()}
        />
    </>
}
