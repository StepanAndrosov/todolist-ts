import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login, authActions, authSelectors} from "../features/Auth";
import {selectInitialized, selectStatus} from "./selectors";
import {useActions} from "../utils/redux-utils";
import {appActions} from "../features/Application";
import {TodoLists} from "../features/TodoLists/TodoLists";


export const App: React.FC = React.memo(() => {
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        if(!isInitialized) {
            initializeApp()
        }

    }, [initializeApp, isInitialized])

    const logoutHandler = useCallback(() => {
        logout()
    }, [logout])

    if (!isInitialized) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
                <CircularProgress/>
            </Box>
        )
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position={"static"}>
                <Toolbar>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                                <Menu/>
                            </IconButton>
                            <Typography variant={"h6"} component={"div"} >
                                News
                            </Typography>
                        </Box>
                        {
                            isLoggedIn &&
                            <Button onClick={logoutHandler} color={"inherit"}>
                                Log out
                            </Button>
                        }
                    </Box>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodoLists />}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
        </div>
    );
})


