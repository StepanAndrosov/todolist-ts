import React, {useCallback, useEffect} from "react";
import style from "./Todolist.module.css"
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../app/store";
import {addTaskTC, fetchTasksTC} from "../tasksReducer";
import {Task} from "./Task/Task";
import {FilterValuesType} from "../todoReducer";
import {TaskStatuses, TaskType} from "../../../api/todolistsAPI";


type PropsTodoListType = {
    id: string
    title: string
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo(({title, changeFilter, filter, ...props}: PropsTodoListType) => {

    console.log('todo')

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [dispatch, props.id])

    const onAllClickHandler = useCallback(() => changeFilter(props.id, "all"), [changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => changeFilter(props.id, "active"), [changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => changeFilter(props.id, "completed"), [changeFilter, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.id, title))
    }, [dispatch, props.id])

    const onChangeTodoListTitleHandler = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props])

    let taskForToDoList: Array<TaskType> = tasks
    switch (filter) {
        case "completed":
            taskForToDoList = tasks.filter(t => t.status === TaskStatuses.Completed)
            break
        case "active":
            taskForToDoList = tasks.filter(t => t.status === TaskStatuses.New)
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
            {taskForToDoList.map(t => {
                return <Task
                    key={t.id}
                    task={t}
                    todolistId={props.id}
                />
            })}
        </div>
        <div style={{marginTop: '15px'}}>
            <Button variant={filter === "all" ? "contained" : "text"}
                    onClick={onAllClickHandler}
                    size={"small"}
            >
                All
            </Button>
            <Button variant={filter === "active" ? "contained" : "text"}
                    color={"primary"}
                    onClick={onActiveClickHandler}
                    size={"small"}
            >
                Active
            </Button>
            <Button variant={filter === "completed" ? "contained" : "text"}
                    color={"secondary"}
                    onClick={onCompletedClickHandler}
                    size={"small"}
            >
                Completed
            </Button>
        </div>
    </div>
})

