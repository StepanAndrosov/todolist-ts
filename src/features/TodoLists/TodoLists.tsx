import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootState, useActions} from "../../app/store";
import {TodolistDomainType} from "./todolists-reducer";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Grid, Paper} from "@mui/material";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {todoListsActions} from "./index";

type PropsTodoListsType = {
    demo?: boolean
}

export const TodoLists: React.FC<PropsTodoListsType> = React.memo(({demo = false}) => {
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {addTodoList, fetchTodolists} = useActions(todoListsActions)

    const addTodoListAsync = useCallback(async (title: string) => addTodoList( title),
        [ addTodoList])

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchTodolists()
    }, [fetchTodolists, demo, isLoggedIn])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }
    return (
        <>
            <Grid container justifyContent={'center'} style={{marginTop: '40px'}}>
                <Paper elevation={2} style={{padding: "15px"}}>
                    <h3>Add task list</h3>
                    <AddItemForm addItem={addTodoListAsync}/>
                </Paper>
            </Grid>
            <Grid container spacing={3} justifyContent={'center'} style={{marginTop: '30px'}}>
                {
                    todolists.map((tl) => {
                        return (
                            <Grid key={tl.id} item style={{paddingBottom: '20px'}}>
                                <Paper key={tl.id} elevation={2} style={{padding: "15px"}}>
                                    <Todolist
                                        todolist={tl}
                                        key={tl.id}
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
