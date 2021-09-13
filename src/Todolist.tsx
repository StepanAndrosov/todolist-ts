import React from "react";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsTodoListType = {
    title: string
    tasks: Array<TaskType>
}

export function Todolist({title, tasks}: PropsTodoListType) {
    return <div>
        <h3>{title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasks.map(item => <li key={item.id+item.title}><input type="checkbox"/> <span>{item.title}</span></li>)}
        </ul>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}