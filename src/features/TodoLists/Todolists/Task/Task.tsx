import {useDispatch} from "react-redux";
import {
    removeTaskTC, updateTaskTC
} from "../../tasksReducer";
import React, {ChangeEvent, useCallback} from "react";
import style from "../Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolistsAPI";


type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo(({task, todolistId}: TaskPropsType) => {

    const dispatch = useDispatch()

    const onRemoveHandler = useCallback(() => {
        dispatch(removeTaskTC(todolistId, task.id))
    }, [dispatch, task.id, todolistId])

    const onChangeStatus = useCallback((checked: boolean) => {
        const status = checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todolistId, task.id, {status}))
    }, [dispatch, task.id, todolistId])

    const onChangeTitleHandler = useCallback((title: string) => {
        dispatch(updateTaskTC(todolistId, task.id , {title}))
    }, [dispatch, task.id, todolistId])

    const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeStatus(e.currentTarget.checked)
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
