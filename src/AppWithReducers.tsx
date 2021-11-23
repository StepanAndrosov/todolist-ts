// import React, {useReducer} from 'react';
// import './App.css';
// import {TaskType, Todolist} from "./components/Todolist/Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./components/AddItemForm/AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     addTodoListAC,
//     changeTodoListFilterAC,
//     changeTodoListTitleAC,
//     removeTodolistAC,
//     todoReducer
// } from "./redux/todoReducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./redux/tasksReducer";

// export type FilterValuesType = "all" | "completed" | "active"
//
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TaskStateType = {
//     [key: string]: Array<TaskType>
// }

// export function AppWithReducers() {
//     const removeTask = (id: string, todolistId: string) => {
//         const action = removeTaskAC(id, todolistId)
//         dispatchTasksReducer(action)
//     }
//     const changeTodoListTitle = (id: string, newTitle: string) => {
//         const action = changeTodoListTitleAC(id, newTitle)
//         dispatchToToDoListsReducer(action)
//     }
//
//     const addTask = (title: string, todolistId: string) => {
//         const action = addTaskAC(title, todolistId)
//         dispatchTasksReducer(action)
//     }
//
//     const changeStatus = (taskId: string, todolistId: string, isDone: boolean) => {
//         const action = changeTaskStatusAC(taskId, todolistId, isDone)
//         dispatchTasksReducer(action)
//     }
//     const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
//         const action = changeTaskTitleAC(taskId, newTitle, todolistId)
//         dispatchTasksReducer(action)
//     }
//     const changeFilter = (todoListId: string, value: FilterValuesType) => {
//         const action = changeTodoListFilterAC(todoListId, value)
//         dispatchToToDoListsReducer(action)
//     }
//     const todolistId1 = v1()
//     const todolistId2 = v1()
//
//     const [todolists, dispatchToToDoListsReducer] = useReducer(todoReducer,[
//         {id: todolistId1, title: "what to learn", filter: "all"},
//         {id: todolistId2, title: "what to buy", filter: "all"}
//     ])
//
//     const removeTodolist = (todolistId: string) => {
//         const action = removeTodolistAC(todolistId)
//         dispatchToToDoListsReducer(action)
//         dispatchTasksReducer(action)
//     }
//
//     const [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
//         [todolistId1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "ReactJS", isDone: false},
//             {id: v1(), title: "Redux", isDone: false}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "Book", isDone: false},
//             {id: v1(), title: "Milk", isDone: false},
//         ]
//     })
//
//     function addTodolist(title: string) {
//         const action = addTodoListAC(title)
//         dispatchToToDoListsReducer(action)
//         dispatchTasksReducer(action)
//     }
//
//     return (
//         <div className="App">
//             <AppBar position={"static"}>
//                 <Toolbar>
//                     <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant={"h6"} component={"div"}>
//                         News
//                     </Typography>
//                     <Button color={"inherit"}>Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: "10px"}}>
//                     <Paper elevation={2} style={{padding: "10px"}}>
//                         <h3>Add task list</h3>
//                         <AddItemForm addItem={addTodolist}/>
//                     </Paper>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {
//                         todolists.map((tl) => {
//                             let taskForToDoList: Array<TaskType>
//                             switch (tl.filter) {
//                                 case "completed":
//                                     taskForToDoList = tasksObj[tl.id].filter((t => t.isDone))
//                                     break
//                                 case "active":
//                                     taskForToDoList = tasksObj[tl.id].filter((t => !t.isDone))
//                                     break
//                                 default:
//                                     taskForToDoList = tasksObj[tl.id]
//                             }
//                             return <Grid item>
//                                 <Paper style={{padding: "10px"}}>
//                                     {/*<Todolist id={tl.id}*/}
//                                     {/*          key={tl.id}*/}
//                                     {/*          title={tl.title}*/}
//                                     {/*          tasks={taskForToDoList}*/}
//                                     {/*          removeTask={removeTask}*/}
//                                     {/*          changeFilter={changeFilter}*/}
//                                     {/*          addTask={addTask}*/}
//                                     {/*          changeTaskStatus={changeStatus}*/}
//                                     {/*          filter={tl.filter}*/}
//                                     {/*          removeTodolist={removeTodolist}*/}
//                                     {/*          changeTaskTitle={changeTaskTitle}*/}
//                                     {/*          changeTodoListTitle={changeTodoListTitle}*/}
//                                     {/*/>*/}
//                                 </Paper>
//                             </Grid>
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     );
// }


