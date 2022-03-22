import React, {useCallback, useEffect} from "react";
import style from "./Todolist.module.css"
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";
import {addTask, fetchTasks} from "../tasks-reducer";
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

export const Todolist = React.memo(({
                                        demo = false,
                                        changeFilter,
                                        todolist,
                                        changeTodoListTitle,
                                        removeTodolist
                                    }: PropsTodoListType) => {

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[todolist.id])

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasks(todolist.id))
    }, [dispatch, todolist.id, demo])

    const onAllClickHandler = useCallback(() => changeFilter(todolist.id, "all"), [changeFilter, todolist.id])
    const onActiveClickHandler = useCallback(() => changeFilter(todolist.id, "active"), [changeFilter, todolist.id])
    const onCompletedClickHandler = useCallback(() => changeFilter(todolist.id, "completed"), [changeFilter, todolist.id])
    const removeTodo = useCallback(() => {
        removeTodolist(todolist.id)
    }, [todolist.id, removeTodolist])

    const onAddTask = useCallback((title: string) => {
        dispatch(addTask({todoListId:todolist.id, title}))
    }, [dispatch, todolist.id])

    const onChangeTodoListTitleHandler = useCallback((newTitle: string) => {
        changeTodoListTitle(todolist.id, newTitle)
    }, [todolist.id, changeTodoListTitle])

    let taskForToDoList: Array<TaskType> = tasks
    switch (todolist.filter) {
        case "completed":
            taskForToDoList = tasks.filter(t => t.status === TaskStatuses.Completed)
            break
        case "active":
            taskForToDoList = tasks.filter(t => t.status === TaskStatuses.New)
            break
    }

    return <div className={style.TodoList}>
        <div>
            <b><EditableSpan title={todolist.title} onChange={onChangeTodoListTitleHandler}/></b>
            <IconButton aria-label="delete" onClick={removeTodo} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </div>
        <AddItemForm addItem={onAddTask} disabled={todolist.entityStatus === 'loading'}/>
        <div>
            {taskForToDoList.map(t => {
                return (
                    <Task
                        key={t.id}
                        task={t}
                        todoListId={todolist.id}
                    />
                )
            })}
        </div>
        <div style={{marginTop: '15px'}}>
            <Stack direction="row" spacing={2}>
                <Button variant={todolist.filter === "all" ? "contained" : "outlined"}
                        onClick={onAllClickHandler}
                        size="small"
                >
                    All
                </Button>
                <Button variant={todolist.filter === "active" ? "contained" : "outlined"}
                        color="success"
                        onClick={onActiveClickHandler}
                        size="small"
                >
                    Active
                </Button>
                <Button variant={todolist.filter === "completed" ? "contained" : "outlined"}
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

