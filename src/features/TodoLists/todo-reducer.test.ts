import {
    addTodoListAC, changeTodolistEntityStatusAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, fetchTodolists, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todoReducer
} from "./todo-reducer";
import {v1} from "uuid";
import {TodolistType} from "../../api/todolistsAPI";
import {RequestStatusType} from "../../app/app-reduser";

const todolistId1 = v1()
const todolistId2 = v1()
const startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: "what to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
    {id: todolistId2, title: "what to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
]
test("remove todolist should be work", () => {
    const endState = todoReducer(startState, removeTodolistAC({id: todolistId1}))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test("add todolist should be work not immutability", () => {
    const newTitle = "what to read?"
    const todolist: TodolistType = {
        id: "todo3",
        title: newTitle,
        addedDate: "",
        order: 0
    }
    const endState = todoReducer(startState, addTodoListAC({todolist}))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[0].filter).toBe("all")
    expect(startState.length).toBe(2)
})
test("change title todolist should be work", () => {
    const newTitle = "what to read?"
    const endState = todoReducer(startState, changeTodoListTitleAC({id:todolistId2, title:newTitle}))
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("what to learn")
    expect(endState[0].id).toBe(todolistId1)
    expect(endState[1].id).toBe(todolistId2)
    expect(endState[1].title).toBe(newTitle)
})
test("change todolist filter should be work", () => {
    const newFilter: FilterValuesType = "active"
    const endState = todoReducer(startState, changeTodoListFilterAC({id:todolistId2, filter:newFilter}))
    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe(newFilter)
})
test("todolists should be added to the state", () => {
    const getterState: Array<TodolistType> = [
        {id: todolistId1, title: "what to learn?", addedDate: '', order: 0},
        {id: todolistId2, title: "what to buy?", addedDate: '', order: 0}
    ]
    const updateObj = {todolists:getterState};
    const action = fetchTodolists.fulfilled(updateObj, 'requestId')
    const endState = todoReducer([], action)
    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('idle')
})
test("correct entity status of todolist should be changed", () => {
    const newStatus: RequestStatusType = "loading"
    const endState = todoReducer(startState, changeTodolistEntityStatusAC({id:todolistId2, status:newStatus}))
    expect(endState.length).toBe(2)
    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})
