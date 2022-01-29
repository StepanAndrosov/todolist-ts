import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../redux/tasksReducer";
import React, {ChangeEvent, useCallback} from "react";
import style from "./Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolistsAPI";


type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo(({task, todolistId}: TaskPropsType) => {

    const dispatch = useDispatch()

    const onRemoveHandler = useCallback(() => {
        dispatch(removeTaskAC(task.id, todolistId))
    }, [dispatch, task.id, todolistId])

    const onChangeHandler = useCallback((checked: boolean) => {
        dispatch(changeTaskStatusAC(task.id, todolistId, checked ? TaskStatuses.Completed : TaskStatuses.New))
    }, [dispatch, task.id, todolistId])

    const onChangeTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(task.id, todolistId, title))
    }, [dispatch, task.id, todolistId])

    const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(e.currentTarget.checked)
    }
    return (
        <div key={task.id + task.title} className={task.status === TaskStatuses.Completed ? style.isDone : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={onChecked}
            />
            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler} aria-label="delete" size={"small"}>
                <Delete/>
            </IconButton>
        </div>
    )
})
