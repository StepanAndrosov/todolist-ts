import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodolists,
    FilterValuesType,
    removeTodoList,
    TodolistDomainType
} from "./todo-reducer";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Grid, Paper} from "@mui/material";
import {Navigate} from "react-router-dom";

type PropsTodoListsType = {
    demo?: boolean
}

export const TodoLists: React.FC<PropsTodoListsType> = React.memo(({demo = false}) => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolists())
    }, [dispatch, demo, isLoggedIn])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        const action = changeTodoListTitleTC(id, newTitle)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        const action = changeTodoListFilterAC({id: todoListId, filter: value})
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((todoListId: string) => {
        const action = removeTodoList(todoListId)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodoListTC(title)
        dispatch(action)
    }, [dispatch])
    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }
    return (
        <>
            <Grid container justifyContent={'center'} style={{marginTop: '40px'}}>
                <Paper elevation={2} style={{padding: "15px"}}>
                    <h3>Add task list</h3>
                    <AddItemForm addItem={addTodolist}/>
                </Paper>
            </Grid>
            <Grid container spacing={3} justifyContent={'center'} style={{marginTop: '30px'}}>
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
