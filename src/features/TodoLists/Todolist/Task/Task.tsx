import React, {ChangeEvent, useCallback} from "react";
import style from "../Todolist.module.css";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../api/todolistsAPI";
import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";
import {useActions} from "../../../../app/store";
import {tasksActions} from "../../index";

type TaskPropsType = {
    task: TaskType
    todoListId: string
}
export const Task = React.memo(({task, todoListId}: TaskPropsType) => {


    const {removeTask, updateTask} = useActions(tasksActions)

    const onRemoveHandler = useCallback(() => {
        removeTask({todoListId, taskId: task.id})
    }, [removeTask, task.id, todoListId])

    const onChangeStatus = useCallback((checked: boolean) => {
        const status = checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({todoListId, taskId: task.id, domainModel: {status}})
    }, [updateTask, task.id, todoListId])

    const onChangeTitleHandler = useCallback((title: string) => {
        updateTask({todoListId, taskId: task.id, domainModel: {title}})
    }, [updateTask, task.id, todoListId])

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
