import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, useActions} from "../../app/store";
import {
    changeTodoListFilterAC,
    FilterValuesType,
    TodolistDomainType
} from "./todolists-reducer";
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
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {changeTodoListTitle, removeTodoList, addTodoList, fetchTodolists} = useActions(todoListsActions)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        fetchTodolists()
    }, [ fetchTodolists, demo, isLoggedIn])

    const onChangeTodoListTitle = useCallback((id: string, newTitle: string) => {
        changeTodoListTitle({id, title: newTitle})
    }, [changeTodoListTitle])
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        const action = changeTodoListFilterAC({id: todoListId, filter: value})
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((todoListId: string) => {
        removeTodoList(todoListId)
    }, [removeTodoList])
    const addTodolist = useCallback((title: string) => {
        addTodoList(title)
    }, [addTodoList])
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
                                        changeTodoListTitle={onChangeTodoListTitle}
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
