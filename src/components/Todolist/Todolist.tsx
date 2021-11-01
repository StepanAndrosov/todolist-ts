import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../../App";
import style from "./Todolist.module.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
            <b><EditableSpan title={title} onChange={onChangeTodoListTitleHandler}/></b>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </div>
        <AddItemForm addItem={AddTask}/>
        <div>
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
                return <div key={item.id + item.title} className={item.isDone ? style.isDone : ""}>
                    <Checkbox
                        checked={item.isDone}
                        onChange={onChangeHandler}
                    />
                    <EditableSpan title={item.title} onChange={onChangeTitleHandler}/>
                    <IconButton onClick={onRemoveHandler} aria-label="delete" size={"small"}>
                        <Delete/>
                    </IconButton>
                </div>
            })}
        </div>
        <div>
            <Button variant={filter === "all" ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={filter === "active" ? "contained" : "text"}
                    color={"primary"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={filter === "completed" ? "contained" : "text"}
                    color={"secondary"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

