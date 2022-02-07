import {addTodoListAC, TodolistDomainType, todoReducer} from "./todoReducer";
import {tasksReducer, TaskStateType} from "./tasksReducer";
import {TodolistType} from "../../api/todolistsAPI";



test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []
    const todolist: TodolistType = {
        id: "todo3",
        title: "new todolist",
        addedDate: "",
        order: 0
    }
    const action = addTodoListAC(todolist)
    const endTaskState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoReducer(startTodolistsState, action)

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
    expect(endTodolistsState.length).toBe(1)
    expect(endTodolistsState[endTodolistsState.length-1].title).toBe("new todolist")
})
