import React, {useCallback} from "react";
import {FilterValuesType} from "../../AppWithRedux";
import style from "./Todolist.module.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../redux/store";
import {addTaskAC} from "../../redux/tasksReducer";
import {Task} from "./Task";


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

export const Todolist = React.memo(({title, changeFilter, filter, ...props}: PropsTodoListType) => {

    console.log('todo')

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

    const onAllClickHandler = useCallback(() => changeFilter(props.id, "all"), [changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => changeFilter(props.id, "active"), [changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => changeFilter(props.id, "completed"), [changeFilter, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [dispatch, props.id])

    const onChangeTodoListTitleHandler = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props])

    let taskForToDoList: Array<TaskType> = tasks
    switch (filter) {
        case "completed":
            taskForToDoList = tasks.filter((t => t.isDone))
            break
        case "active":
            taskForToDoList = tasks.filter((t => !t.isDone))
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
            {taskForToDoList.map(t => <Task key={t.id} task={t} todolistId={props.id}/>)}
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
})

