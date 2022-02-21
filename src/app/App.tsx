import React from 'react';
import './App.css';
import {TodoLists} from "../features/TodoLists/TodoLists";
import {AppBar, Box, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./app-reduser";
import {AppRootState} from "./store";

type PropsAppType = {
    demo?: boolean
}

export const App: React.FC<PropsAppType> = React.memo(({demo = false}) => {
    const status = useSelector<AppRootState, RequestStatusType>((state) => state.app.status )
    return (
        <div className="App">
            <ErrorSnackbar/>
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
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodoLists demo={demo}/>
            </Container>
        </div>
    );
})


