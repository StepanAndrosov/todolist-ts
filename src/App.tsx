import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active"

export function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(item => item.id !== id)
        setTasks(filteredTasks)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter((value))
    }

    let taskForToDoList
    switch (filter) {
        case "completed":
            taskForToDoList = tasks.filter((t => t.isDone === true))
            break
        case "active":
            taskForToDoList = tasks.filter((t => t.isDone === false))
            break
        default: taskForToDoList = tasks
    }

    return (
        <div className="App">
            <Todolist title="What to learn?"
                      tasks={taskForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}


