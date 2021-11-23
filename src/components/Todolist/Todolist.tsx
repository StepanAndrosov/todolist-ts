import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../../AppWithRedux";
import style from "./Todolist.module.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../redux/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../redux/tasksReducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsTodoListType = {
    id: string
    title: string
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function Todolist({title, changeFilter, filter, ...props}: PropsTodoListType) {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

    const onAllClickHandler = () => changeFilter(props.id, "all")
    const onActiveClickHandler = () => changeFilter(props.id, "active")
    const onCompletedClickHandler = () => changeFilter(props.id, "completed")

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.id))
    }
    const onChangeTodoListTitleHandler = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }

    const allTodolistTasks = tasks
    let taskForToDoList: Array<TaskType> = allTodolistTasks
    switch (filter) {
        case "completed":
            taskForToDoList = allTodolistTasks.filter((t => t.isDone))
            break
        case "active":
            taskForToDoList = allTodolistTasks.filter((t => !t.isDone))
            break
    }

    return <div className={style.TodoList}>
        <div>
            <b><EditableSpan title={title} onChange={onChangeTodoListTitleHandler}/></b>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </div>
        <AddItemForm addItem={addTask}/>
        <div>
            {taskForToDoList.map(item => {
                const onRemoveHandler = () => {
                    dispatch(removeTaskAC(item.id, props.id))
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeTaskStatusAC(item.id, props.id, e.currentTarget.checked))
                }
                const onChangeTitleHandler = (newValue: string) => {
                    dispatch(changeTaskTitleAC(item.id, props.id, newValue))
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

