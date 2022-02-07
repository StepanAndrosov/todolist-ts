import React from 'react';
import './App.css';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodoLists} from "../features/TodoLists/TodoLists";

export const App = () => {
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
                <TodoLists/>
            </Container>
        </div>
    );
}


