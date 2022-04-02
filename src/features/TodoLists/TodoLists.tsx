import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/AddItemForm/AddItemForm";
import {Grid, Paper} from "@mui/material";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import { Todolist } from "./Todolist/Todolist";
import {useActions, useAppDispatch} from "../../utils/redux-utils";
import {AppRootState} from "../Application/types";
import {TodolistDomainType} from "./types";
import {todoListsActions} from "./todolists-index";

type PropsTodoListsType = {
    demo?: boolean
}

export const TodoLists: React.FC<PropsTodoListsType> = React.memo(({demo = false}) => {
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {fetchTodolists} = useActions(todoListsActions)
    const dispatch = useAppDispatch()

    const addTodoListAsync = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
            const thunk = todoListsActions.addTodoList(title)
            const res = await dispatch(thunk)
            if (todoListsActions.addTodoList.rejected.match(res)) {
                if (res.payload?.errors?.length) {
                    const errorMessage = res.payload?.errors[0]
                    helper.setError(errorMessage)
                } else {
                    helper.setError("Some error occurred")
                }
            } else {
                helper.setTitle('')
            }
        }, [dispatch])

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
