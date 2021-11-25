import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../redux/tasksReducer";
import React, {ChangeEvent, useCallback} from "react";
import style from "./Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()

    const onRemoveHandler = useCallback(() => {
        dispatch(removeTaskAC(props.task.id, props.todolistId))
    },[dispatch, props.task.id, props.todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, props.todolistId, e.currentTarget.checked))
    },[dispatch, props.task.id, props.todolistId])

    const onChangeTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.task.id, props.todolistId, title))
    },[dispatch, props.task.id, props.todolistId])

    return <div key={props.task.id + props.task.title} className={props.task.isDone ? style.isDone : ""}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onChangeHandler}
        />
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onRemoveHandler} aria-label="delete" size={"small"}>
            <Delete/>
        </IconButton>
    </div>
})