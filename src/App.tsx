import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType
} from "./redux/todoReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./redux/store";
import {TaskType} from "./api/todolistsAPI";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export const App = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists)

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        const action = changeTodoListTitleAC(id, newTitle)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
        const action = changeTodoListFilterAC(todoListId, value)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                                <Menu/>
                            </IconButton>
                            <Typography variant={"h6"} component={"div"}>
                                News
                            </Typography>
                        </Box>
                        <Button color={"inherit"}>
                            Login
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
                                            id={tl.id}
                                            key={tl.id}
                                            title={tl.title}
                                            changeFilter={changeFilter}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


