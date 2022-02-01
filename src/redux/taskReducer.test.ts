import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer,
    TaskStateType
} from "./tasksReducer";
import {addTodoListAC, removeTodolistAC, setTodolistsAC} from "./todoReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolistsAPI";


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
    const removeId = "1"
    const todoListId = "todolistId1"
    const action = removeTaskAC(removeId, todoListId)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(3)
    expect(endState[todoListId].every(t => t.id != removeId)).toBeTruthy()
})

test("add task should be work not immutability", () => {

    const newTitle = "Vue & NuxtJS"
    const todoListId = "todolistId1"
    const action = addTaskAC(newTitle, todoListId)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId].length).toBe(5)
    expect(endState[todoListId][0].title).toBe(newTitle)
    expect(endState[todoListId][0].id).toBeDefined()
    expect(endState[todoListId][0].status).toBe(TaskStatuses.New)
    expect(startState["todolistId2"].length).toBe(3)
})


test("change task status todolist should be work", () => {

    const changeStatusTaskId = "3"
    const todoListId = "todolistId1"
    const action = changeTaskStatusAC(changeStatusTaskId, todoListId, TaskStatuses.Completed)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId][2].status).toBe(TaskStatuses.Completed)
    expect(endState["todolistId2"][2].status).toBe(TaskStatuses.New)
})


test("change task title should be work", () => {

    const changeTitleTaskId = "3"
    const todoListId = "todolistId1"
    const newTitle = "React, Vue, NextJS, NuxtJS"
    const action = changeTaskTitleAC(changeTitleTaskId, todoListId, newTitle)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId][2].title).toBe(newTitle)
    expect(endState[todoListId][0].title).toBe("HTML&CSS")
    expect(endState[todoListId][1].title).toBe("JS")
    expect(endState[todoListId][3].title).toBe("Redux")
})

test("new property with new array should be added when todolist is added", () => {

    const action = addTodoListAC("new todolist")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test("remove todolist should be delete", () => {
    const todolistId = "todolistId2"
    const action = removeTodolistAC(todolistId)
    const endState = tasksReducer(startState, action)
    expect(endState[todolistId]).toBeUndefined()
    expect(endState["todolistId1"]).toBe(startState["todolistId1"])
})

test("empty arrays should be added when we set todolists", () => {
    const action = setTodolistsAC([
        {id: "todolistId1", title: "what to learn?", addedDate: '', order: 0},
        {id: "todolistId2", title: "what to buy?", addedDate: '', order: 0}
    ])
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
        }]

    const action = setTasksAC(key, tasks)
    const endState = tasksReducer(todo, action)

    expect(endState[key].length).toBe(3)
})
