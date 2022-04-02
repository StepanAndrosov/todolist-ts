import React, {ChangeEvent, useCallback} from "react";
import style from "../Todolist.module.css";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../api/todolistsAPI";
import {Delete} from "@mui/icons-material";
import {Checkbox, IconButton} from "@mui/material";
import {tasksActions} from "../index";
import {useActions} from "../../../../utils/redux-utils";

type TaskPropsType = {
    task: TaskType
    todoListId: string
}
export const Task = React.memo(({task, todoListId}: TaskPropsType) => {

    const {removeTask, updateTask} = useActions(tasksActions)

    const onRemoveHandler = useCallback(() => removeTask({
        todoListId,
        taskId: task.id
    }), [removeTask, todoListId, task.id])

    const onChangeTitleHandler = useCallback((title: string) => updateTask({
        todoListId,
        taskId: task.id,
        domainModel: {title}
    }), [updateTask, todoListId, task.id])

    const onChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({todoListId, taskId: task.id, domainModel: {status}})
    }, [updateTask, todoListId, task.id])

    return (
        <div key={task.id + task.title} className={task.status === TaskStatuses.Completed ? style.isDone : ""} style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={onChecked}
            />
            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler} aria-label="delete" size={"small"} style={{position: 'absolute', right: '5px'}}>
                <Delete fontSize='small'/>
            </IconButton>
        </div>
    )
})
