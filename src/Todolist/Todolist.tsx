import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";
import style from "./Todolist.module.scss"

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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter}: PropsTodoListType) {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            if (newTaskTitle.trim() === "") {
                setError("Title is required")
                return
            }
            addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        }
    }
    const addedTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return
        }
        addTask(newTaskTitle.trim())
        setNewTaskTitle("")
    }
    const onAllClickHandler = () => changeFilter("all")
    const onActiveClickHandler = () => changeFilter("active")
    const onCompletedClickHandler = () => changeFilter("completed")


    return <div className={style.TodoList}>
        <h3>{title}</h3>
        <div>
            <input className={error ? style.error : ""}
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addedTask}>+</button>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
        <ul>
            {tasks.map(item => {
                const onRemoveHandler = () => {
                    removeTask(item.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(item.id, e.currentTarget.checked)
                }
                return <li key={item.id + item.title} className={item.isDone ? style.isDone : ""}>
                    <input type="checkbox"
                           checked={item.isDone}
                           onChange={onChangeHandler}
                    />
                    <span>{item.title}</span>
                    <button onClick={onRemoveHandler}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button className={filter === "all"? style.activeFilter : ""} onClick={onAllClickHandler}>All</button>
            <button className={filter === "active"? style.activeFilter : ""} onClick={onActiveClickHandler}>Active</button>
            <button className={filter === "completed"? style.activeFilter : ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}