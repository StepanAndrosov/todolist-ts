import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodoListTC,
    TodolistDomainType
} from "./todoReducer";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Grid, Paper} from "@mui/material";

type PropsTodoListsType = {
    demo?: boolean
}

export const TodoLists: React.FC<PropsTodoListsType> = React.memo(({demo = false}) => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [dispatch, demo])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        const action = changeTodoListTitleTC(id, newTitle)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        const action = changeTodoListFilterAC(todoListId, value)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodoListTC(todolistId)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodoListTC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <>
            <Grid container style={{padding: "15px"}}>
                <Paper elevation={2} style={{padding: "15px"}}>
                    <h3>Add task list</h3>
                    <AddItemForm addItem={addTodolist}/>
                </Paper>
            </Grid>
            <Grid container spacing={3} style={{padding: "15px"}}>
                {
                    todolists.map((tl) => {
                        return (
                            <Grid key={tl.id} item>
                                <Paper key={tl.id} elevation={2} style={{padding: "15px"}}>
                                    <Todolist
                                        todolist={tl}
                                        key={tl.id}
                                        changeFilter={changeFilter}
                                        removeTodolist={removeTodolist}
                                        changeTodoListTitle={changeTodoListTitle}
                                        demo={demo}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
})
