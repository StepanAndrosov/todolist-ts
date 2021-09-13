import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    const task1 = [
    {id:1, title: "HTML&CSS", isDone: true},
    {id:2, title: "JS", isDone: true},
    {id:3, title: "ReactJS", isDone: false}
    ]
    const task2 = [
    {id:1, title: "Hello world", isDone: true},
    {id:2, title: "I`m Happy", isDone: false},
    {id:3, title: "Yo-yo", isDone: false}
]
    return (
        <div className="App">
            <Todolist title="What to learn" tasks={task1}/>
            <Todolist title="Songs" tasks={task2}/>
        </div>
    );
}

export default App;

