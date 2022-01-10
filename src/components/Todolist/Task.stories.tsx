import {Task} from "./Task";
import React from "react";
import {ReduxStoreDecorator} from "../../stories/decorators/ReduxStoreDecorator";
import {Meta} from "@storybook/react";


export default {
    title: "Todolist/Task comp",
    component: Task,
    decorators: [ReduxStoreDecorator]
} as Meta


export const TaskExample = () => {
    return <>
        <Task
            key={(Math.random()*100).toString()}
            task={{id: '1', isDone: false, title: 'Reactive Technologies'}}
            todolistId={(Math.random()*100).toString()}
        />
        <Task
            key={(Math.random()*100).toString()}
            task={{id: '2', isDone: true, title: 'Reactive Technologies'}}
            todolistId={(Math.random()*100).toString()}
        />
    </>
}
