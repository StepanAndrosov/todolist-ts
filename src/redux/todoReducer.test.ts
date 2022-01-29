import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todoReducer
} from "./todoReducer";
import {v1} from "uuid";


test("remove todolist should be work", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "what to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "what to buy", filter: "all", addedDate: '', order: 0}
    ]

    const endState = todoReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test("add todolist should be work not immutability", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "what to learn?", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "what to buy?", filter: "all", addedDate: '', order: 0}
    ]
    const newTitle = "what to read?"
    const endState = todoReducer(startState, addTodoListAC(newTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[0].filter).toBe("all")
    expect(startState.length).toBe(2)
})
test("change title todolist should be work", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const newTitle = "what to read?"
    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "what to learn?", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "what to buy?", filter: "all", addedDate: '', order: 0}
    ]
    const endState = todoReducer(startState, changeTodoListTitleAC(todolistId2, newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("what to learn?")
    expect(endState[0].id).toBe(todolistId1)
    expect(endState[1].id).toBe(todolistId2)
    expect(endState[1].title).toBe(newTitle)
})
test("change todolist filter should be work", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const newFilter: FilterValuesType = "active"
    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "what to learn?", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "what to buy?", filter: "all", addedDate: '', order: 0}
    ]
    const endState = todoReducer(startState, changeTodoListFilterAC(todolistId2, newFilter))

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe(newFilter)
})
