import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import style from "./Todolist.module.scss"
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsTodoListType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function Todolist({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             changeTaskStatus,
                             filter,
                             ...props
                         }: PropsTodoListType) {

    const onAllClickHandler = () => changeFilter("all", props.id)
    const onActiveClickHandler = () => changeFilter("active", props.id)
    const onCompletedClickHandler = () => changeFilter("completed", props.id)

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const AddTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onChangeTodoListTitleHandler = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return <div className={style.TodoList}>
        <div>
            <h3><EditableSpan title={title} onChange={onChangeTodoListTitleHandler}/></h3>
            <button onClick={removeTodolist}>x</button>
        </div>
        <AddItemForm addItem={AddTask}/>
        <ul>
            {tasks.map(item => {
                const onRemoveHandler = () => {
                    removeTask(item.id, props.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(item.id, e.currentTarget.checked, props.id)
                }
                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(item.id, newValue, props.id)
                }
                return <li key={item.id + item.title} className={item.isDone ? style.isDone : ""}>
                    <input type="checkbox"
                           checked={item.isDone}
                           onChange={onChangeHandler}
                    />
                    <EditableSpan title={item.title} onChange={onChangeTitleHandler}/>
                    <button onClick={onRemoveHandler}>x</button>
                </li>
            })}
        </ul>
        <div>
            <button className={filter === "all" ? style.activeFilter : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={filter === "active" ? style.activeFilter : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === "completed" ? style.activeFilter : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

