import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function App() {

    const removeTask = (id: string, todolistId: string) => {
        const tasks = tasksObj[todolistId]
        tasksObj[todolistId] = tasks.filter((item: { id: string; }) => item.id !== id)
        setTasksObj({...tasksObj})
    }

    const addTask = (title: string, todolistId: string) => {
        const task = {id: v1(), title: title, isDone: false}
        const tasks = tasksObj[todolistId]
        tasksObj[todolistId] = [task, ...tasks]
        setTasksObj({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const tasks = tasksObj[todolistId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }

    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todolist = todolists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "what to learn", filter: "active"},
        {id: todolistId2, title: "what to buy", filter: "completed"}
    ])

    const removeTodolist = (todolistId: string) => {
        const  filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    const [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
        ]
    })

    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let taskForToDoList: Array<TaskType>
                    switch (tl.filter) {
                        case "completed":
                            taskForToDoList = tasksObj[tl.id].filter((t => t.isDone))
                            break
                        case "active":
                            taskForToDoList = tasksObj[tl.id].filter((t => !t.isDone))
                            break
                        default:
                            taskForToDoList = tasksObj[tl.id]
                    }
                    return <Todolist id={tl.id}
                                     key={tl.id}
                                     title={tl.title}
                                     tasks={taskForToDoList}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                                     removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}


