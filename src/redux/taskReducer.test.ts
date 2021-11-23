import { TaskStateType} from "../AppWithRedux";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasksReducer";
import {addTodoListAC, removeTodolistAC} from "./todoReducer";

test("correct task should be deleted from correct array", () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Eggs", isDone: false},
        ]
    }
    const removeId = "1"
    const todoListId = "todolistId1"
    const action = removeTaskAC(removeId, todoListId)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(3)
    expect(endState[todoListId].every(t => t.id != removeId)).toBeTruthy()
})

test("add task should be work not immutability", () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Eggs", isDone: false},
        ]
    }
    const newTitle = "Vue & NuxtJS"
    const todoListId = "todolistId1"
    const action = addTaskAC(newTitle, todoListId)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId].length).toBe(5)
    expect(endState[todoListId][0].title).toBe(newTitle)
    expect(endState[todoListId][0].id).toBeDefined()
    expect(endState[todoListId][0].isDone).toBe(false)
    expect(startState["todolistId2"].length).toBe(3)
})


test("change task status todolist should be work", () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Eggs", isDone: false},
        ]
    }
    const changeStatusTaskId = "3"
    const todoListId = "todolistId1"
    const action = changeTaskStatusAC(changeStatusTaskId, todoListId, true)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId][2].isDone).toBeTruthy()
    expect(endState["todolistId2"][2].isDone).toBeFalsy()
})


test("change task title should be work", () => {
    const startState: TaskStateType = {
        "todolistId1": [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Eggs", isDone: false},
        ]
    }
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
    const startState: TaskStateType = {
        "todolistId1": [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Eggs", isDone: false},
        ]
    }

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

    const startState: TaskStateType = {
        "todolistId1": [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Redux", isDone: false}
        ],
        "todolistId2": [
            {id: '1', title: "Book", isDone: false},
            {id: '2', title: "Milk", isDone: false},
            {id: '3', title: "Eggs", isDone: false},
        ]
    }
    const todolistId = "todolistId2"
    const action = removeTodolistAC(todolistId)
    const endState = tasksReducer(startState, action)

    expect(endState[todolistId]).toBeUndefined()
    expect(endState["todolistId1"]).toBe(startState["todolistId1"])
})