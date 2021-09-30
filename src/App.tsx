import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

export function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter((item: { id: string; }) => item.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter((value))
    }

    let taskForToDoList
    switch (filter) {
        case "completed":
            taskForToDoList = tasks.filter((t => t.isDone))
            break
        case "active":
            taskForToDoList = tasks.filter((t => !t.isDone))
            break
        default:
            taskForToDoList = tasks
    }

    return (
        <div className="App">
            <Todolist title="What to learn?"
                      tasks={taskForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}/>

        </div>
    );
}


