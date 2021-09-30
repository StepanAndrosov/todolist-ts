import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsTodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist({title, tasks, removeTask, changeFilter, addTask}: PropsTodoListType) {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const addedTask = () => {
        addTask(newTaskTitle)
        setNewTaskTitle("")
    }
    const onAllClickHandler = () => changeFilter("all")
    const onActiveClickHandler = () => changeFilter("active")
    const onCompletedClickHandler = () => changeFilter("completed")


    return <div>
        <h3>{title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addedTask}>+
            </button>
        </div>
        <ul>
            {tasks.map(item => {
                const onRemoveHandler = () => {removeTask(item.id)}
                return <li key={item.id + item.title}>
                    <input type="checkbox" defaultChecked={item.isDone}/>
                    <span>{item.title}</span>
                    <button onClick={onRemoveHandler}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}