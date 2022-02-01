import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolistsAPI";

export default {
    title: 'API Stories/API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(res => setState(res.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const onCreateTodo = () => {
        todolistsAPI.createTodolist(title)
            .then(res => setState(res.data))
        setTitle('')
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input value={title} placeholder='Enter the title of the new todo'
                   onInput={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={onCreateTodo}>Create Todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const onDeleteTodo = () => {
        todolistsAPI.deleteTodolist(title)
            .then(res => setState(res.data))
        setTitle('')
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input value={title} placeholder='Enter the id todo' onInput={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={onDeleteTodo}>Delete Todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [id, setId] = useState<string>('')
    const onUpdateTodo = () => {
        todolistsAPI.updateTodolist(id, title)
            .then(res => setState(res.data))
        setId('')
        setTitle('')
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input value={id} placeholder="Enter the id todo" onInput={(e) => setId(e.currentTarget.value)}/>
            <input value={title} placeholder="Enter the title of the new todo"
                   onInput={(e) => setTitle(e.currentTarget.value)}/>
            <div>
                <button style={{marginTop: '15px'}} onClick={onUpdateTodo}>
                    Update title todolist
                </button>
            </div>
        </div>
    </div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')
    const onGetTasks = () => {
        todolistsAPI.getTasks(id)
            .then(res => setState(res.data))
        setId('')
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input value={id} placeholder='Enter the id todo' onInput={(e) => setId(e.currentTarget.value)}/>
            <button onClick={onGetTasks}>Get Tasks</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const onDeleteTask = () => {
        todolistsAPI.deleteTask(todoId, taskId)
            .then(res => setState(res.data))
        setTodoId('')
        setTaskId('')
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input value={todoId} placeholder="Enter the id todo" onInput={(e) => setTodoId(e.currentTarget.value)}/>
            <input value={taskId} placeholder="Enter the id task" onInput={(e) => setTaskId(e.currentTarget.value)}/>
            <div>
                <button style={{marginTop: '15px'}} onClick={onDeleteTask}>
                    Delete Task
                </button>
            </div>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const onCreateTask = () => {
        todolistsAPI.createTask(todoId, title)
            .then(res => setState(res.data))
        setTodoId('')
        setTitle('')
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input value={todoId} placeholder="Enter the id todo" onInput={(e) => setTodoId(e.currentTarget.value)}/>
            <input value={title} placeholder="Enter the title task" onInput={(e) => setTitle(e.currentTarget.value)}/>
            <div>
                <button style={{marginTop: '15px'}} onClick={onCreateTask}>
                    Create Task
                </button>
            </div>
        </div>
    </div>
}
export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const item = {
        title: title,
        description: desc,
        status: 0,
        priority: 1,
        startDate: new Date().toDateString(),
        deadline: new Date().toLocaleDateString()
    }

    const onUpdateTask = () => {
        console.log(item)
        todolistsAPI.updateTask(todoId, taskId, item)
            .then(res => setState(res.data))
        setTodoId('')
        setTaskId('')
        setDesc('')
        setTitle('')
    }
    return (
        <div> {JSON.stringify(state)}
            <div>
                <div>
                    <input value={todoId} placeholder="Enter the id todo"
                           onInput={(e) => setTodoId(e.currentTarget.value)}
                    />
                    <input value={taskId} placeholder="Enter the id task"
                           onInput={(e) => setTaskId(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <p>Task Body</p>
                    <input value={title} placeholder="Enter the title task"
                           onInput={(e) => setTitle(e.currentTarget.value)}
                    />
                    <input value={desc} placeholder="Enter the description task"
                           onInput={(e) => setDesc(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button style={{marginTop: '15px'}} onClick={onUpdateTask}>
                        Update Task
                    </button>
                </div>
            </div>
        </div>)
}
