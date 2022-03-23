import {addTask, fetchTasks, removeTask, tasksReducer, TaskStateType, updateTask} from "./tasks-reducer";
import {addTodoList, fetchTodolists, removeTodoList} from "./todo-reducer";
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "../../api/todolistsAPI";

const startState: TaskStateType = {
    "todolistId1": [
        {
            id: '1',
            title: "HTML&CSS",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: '',
            description: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ""
        },
        {
            id: '2', title: "JS",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: '',
            description: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ""
        },
        {
            id: '3', title: "ReactJS",
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            description: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ""
        },
        {
            id: '4', title: "Redux",
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            description: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ""
        }
    ],
    "todolistId2": [
        {
            id: '1', title: "Book",
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            description: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ""
        },
        {
            id: '2', title: "Milk",
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            description: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ""
        },
        {
            id: '3', title: "Eggs",
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            description: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ""
        },
    ]
}

test("correct task should be deleted from correct array", () => {
    const todoListId = "todolistId1"
    const taskId = "1"
    const action = removeTask.fulfilled({todoListId, taskId}, "", {todoListId, taskId})
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(3)
    expect(endState[todoListId].every(t => t.id != taskId)).toBeTruthy()
})
test("add task should be work not immutability", () => {
    const task: TaskType = {
        id: '5',
        title: "Vue & NuxtJS",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        description: '',
        deadline: '',
        todoListId: "todolistId1",
        order: 0,
        addedDate: ""
    }
    const todoListId = "todolistId1"
    const action = addTask.fulfilled(task, 'requestId', {title: task.title, todoListId:task.todoListId})
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId].length).toBe(5)
    expect(endState[todoListId][0].title).toBe(task.title)
    expect(endState[todoListId][0].id).toBe('5')
    expect(endState[todoListId][0].status).toBe(TaskStatuses.New)
    expect(endState[todoListId][0].priority).toBe(TaskPriorities.Low)
    expect(endState[todoListId][0].todoListId).toBe(todoListId)
    expect(startState["todolistId2"].length).toBe(3)
})
test("change task status todolist should be work", () => {
    const changeStatusTaskId = "3"
    const todoListId = "todolistId1"
    const newVar = {
        todoListId,
        taskId: changeStatusTaskId,
        domainModel: {status: TaskStatuses.Completed}
    };
    const action = updateTask.fulfilled( newVar, "requestId", newVar)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId][2].status).toBe(TaskStatuses.Completed)
    expect(endState["todolistId2"][2].status).toBe(TaskStatuses.New)
})
test("change task title should be work", () => {
    const changeTitleTaskId = "3"
    const todoListId = "todolistId1"
    const newTitle = "React, Vue, NextJS, NuxtJS"
    const newVar = {
        todoListId,
        taskId: changeTitleTaskId,
        domainModel: {title: newTitle}
    };
    const action = updateTask.fulfilled(newVar, 'requestId', newVar)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId][2].title).toBe(newTitle)
    expect(endState[todoListId][0].title).toBe("HTML&CSS")
    expect(endState[todoListId][1].title).toBe("JS")
    expect(endState[todoListId][3].title).toBe("Redux")
})
test("new property with new array should be added when todolist is added", () => {
    const todolist: TodolistType = {
        id: "todo3",
        title: "new todolist",
        addedDate: "",
        order: 0
    }
    const action = addTodoList.fulfilled({todolist}, 'requestId', todolist.id)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(newKey).toBe("todo3")
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test("remove todolist should be delete", () => {
    const id = "todolistId2"
    const action = removeTodoList.fulfilled({id}, 'requestId', id)
    const endState = tasksReducer(startState, action)
    expect(endState[id]).toBeUndefined()
    expect(endState["todolistId1"]).toBe(startState["todolistId1"])
})
test("empty arrays should be added when we set todolists", () => {
    const payload = {
        todolists: [
            {id: "todolistId1", title: "what to learn?", addedDate: '', order: 0},
            {id: "todolistId2", title: "what to buy?", addedDate: '', order: 0}
        ]
    };
    const action = fetchTodolists.fulfilled(payload, 'requestId')
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState["todolistId1"]).toStrictEqual([])
    expect(endState["todolistId2"]).toStrictEqual([])
})
test("tasks should be added for todolist", () => {
    const key = "todolistId1"
    const todo: TaskStateType = {key: []}
    const tasks: Array<TaskType> = [
        {
            id: '1',
            title: "HTML&CSS",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: '',
            description: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ""
        },
        {
            id: '2', title: "JS",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: '',
            description: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ""
        },
        {
            id: '3', title: "ReactJS",
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            description: '',
            deadline: '',
            todoListId: "todolistId1",
            order: 0,
            addedDate: ""
        }
    ]
    const action = fetchTasks.fulfilled({todoListId: key, tasks}, '', key)
    const endState = tasksReducer(todo, action)

    expect(endState[key].length).toBe(3)
})
