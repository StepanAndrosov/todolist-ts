import React, {useCallback, useEffect} from "react";
import style from "./Todolist.module.css"
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";
import {addTaskTC, fetchTasksTC} from "../tasks-reducer";
import {Task} from "./Task/Task";
import {FilterValuesType, TodolistDomainType} from "../todo-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolistsAPI";
import {Delete} from "@mui/icons-material";
import {Button, IconButton, Stack} from "@mui/material";

type PropsTodoListType = {
    todolist: TodolistDomainType
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    removeTodolist: (todolistId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({ demo = false, ...props}: PropsTodoListType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todolist.id])

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [dispatch, props.todolist.id, demo])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "all"), [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "active"), [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "completed"), [props.changeFilter, props.todolist.id])
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [props])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todolist.id, title))
    }, [dispatch, props.todolist.id])

    const onChangeTodoListTitleHandler = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todolist.id, newTitle)
    }, [props])

    let taskForToDoList: Array<TaskType> = tasks
    switch (props.todolist.filter) {
        case "completed":
            taskForToDoList = tasks.filter(t => t.status === TaskStatuses.Completed)
            break
        case "active":
            taskForToDoList = tasks.filter(t => t.status === TaskStatuses.New)
            break
    }

    return <div className={style.TodoList}>
        <div>
            <b><EditableSpan title={props.todolist.title} onChange={onChangeTodoListTitleHandler}/></b>
            <IconButton aria-label="delete" onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </div>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {taskForToDoList.map(t => {
                return <Task
                    key={t.id}
                    task={t}
                    todolistId={props.todolist.id}
                />
            })}
        </div>
        <div style={{marginTop: '15px'}}>
            <Stack direction="row" spacing={2}>
                <Button variant={props.todolist.filter === "all" ? "contained" : "outlined"}
                        onClick={onAllClickHandler}
                        size="small"
                >
                    All
                </Button>
                <Button variant={props.todolist.filter === "active" ? "contained" : "outlined"}
                        color="success"
                        onClick={onActiveClickHandler}
                        size="small"
                >
                    Active
                </Button>
                <Button variant={props.todolist.filter === "completed" ? "contained" : "outlined"}
                        color="secondary"
                        onClick={onCompletedClickHandler}
                        size="small"
                >
                    Completed
                </Button>
            </Stack>
        </div>
    </div>
})

