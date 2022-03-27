import React, {useCallback, useEffect} from "react";
import style from "./Todolist.module.css"
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {useSelector} from "react-redux";
import {AppRootState, useActions, useAppDispatch} from "../../../app/store";
import {Task} from "./Task/Task";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolistsAPI";
import {Delete} from "@mui/icons-material";
import {Button, IconButton, Stack} from "@mui/material";
import {tasksActions, todoListsActions} from "../index";
import {OverridableStringUnion} from "@mui/types";

type PropsTodoListType = {
    todolist: TodolistDomainType
    demo?: boolean
}

export const Todolist = React.memo(({
                                        demo = false,
                                        todolist,
                                    }: PropsTodoListType) => {
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[todolist.id])
    const {fetchTasks} = useActions(tasksActions)
    const {changeTodoListFilter, removeTodoList, changeTodoListTitle} = useActions(todoListsActions)

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasks(todolist.id)
    }, [todolist.id, demo, fetchTasks])

    const onFilterClickBtn = useCallback((filter: FilterValuesType) => changeTodoListFilter({id: todolist.id, filter}),
        [changeTodoListFilter, todolist.id])

    const removeTodo = useCallback(() => removeTodoList(todolist.id),
        [todolist.id, removeTodoList])

    const onAddTask = useCallback(async (title: string) => {
        const thunk = tasksActions.addTask({todoListId: todolist.id, title})
        const res = await dispatch(thunk)

        if (tasksActions.addTask.rejected.match(res)) {
            if (res.payload?.errors?.length) {
                const errorMessage = res.payload?.errors[0]
                throw new Error(errorMessage)
            } else {
                throw  new Error("Some error occurred")
            }
        }
    }, [todolist.id, dispatch])

    const onChangeTodoListTitleHandler = useCallback((newTitle: string) => changeTodoListTitle({
        id: todolist.id,
        title: newTitle
    }), [todolist.id, changeTodoListTitle])

    let taskForToDoList: Array<TaskType> = tasks
    switch (todolist.filter) {
        case "completed":
            taskForToDoList = tasks.filter(t => t.status === TaskStatuses.Completed)
            break
        case "active":
            taskForToDoList = tasks.filter(t => t.status === TaskStatuses.New)
            break
    }

    const renderFilterButton = (
        filter: FilterValuesType,
        currentColor: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'>,
        text: string
    ) => {
        return (
            <Button variant={todolist.filter === filter ? "contained" : "outlined"}
                    onClick={() => onFilterClickBtn(filter)}
                    size="small"
                    color={currentColor}
            >
                {text}
            </Button>
        )
    }

    return <div className={style.TodoList}>
        <div className={style.TodoTitle}>
            <b><EditableSpan title={todolist.title} onChange={onChangeTodoListTitleHandler}/></b>
            <IconButton aria-label="delete" onClick={removeTodo} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </div>
        <AddItemForm addItem={onAddTask} disabled={todolist.entityStatus === 'loading'}/>
        <div className={style.Tasks}>
            {taskForToDoList.map(t => {
                    return (
                        <Task
                            key={t.id}
                            task={t}
                            todoListId={todolist.id}
                        />
                    )
                }
            )}
            {!taskForToDoList.length && <div>No tasks</div>}
        </div>
        <div style={{marginTop: '15px'}}>
            <Stack direction="row" spacing={2}>
                {renderFilterButton('all', 'primary', 'All')}
                {renderFilterButton('active', 'success', 'Active')}
                {renderFilterButton('completed', 'secondary', 'Completed')}
            </Stack>
        </div>
    </div>
})
