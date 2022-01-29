import {TaskStateType} from "../App";
import {addTodoListAC, TodolistDomainType, todoReducer} from "./todoReducer";
import {tasksReducer} from "./tasksReducer";



test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodoListAC("new")
    const endTaskState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoReducer(startTodolistsState, action)

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
    expect(endTodolistsState.length).toBe(1)
    expect(endTodolistsState[endTodolistsState.length-1].title).toBe("new")
})
