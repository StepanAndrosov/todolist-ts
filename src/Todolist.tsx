import React from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsTodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist({title, tasks, removeTask, changeFilter}: PropsTodoListType) {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasks.map(item => <li key={item.id + item.title}>
                <input type="checkbox" defaultChecked={item.isDone}/>
                <span>{item.title}</span>
                <button onClick={() => {removeTask(item.id)}}>x</button>
            </li>)}
        </ul>
        <div>
            <button onClick={() => {changeFilter("all")}}>All</button>
            <button onClick={() => {changeFilter("active")}}>Active</button>
            <button onClick={() => {changeFilter("completed")}}>Completed</button>
        </div>
    </div>
}