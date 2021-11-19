import {TaskStateType, TodoListType} from "../App";
import {addTodoListAC, todoReducer} from "./todoReducer";
import {tasksReducer} from "./tasksReducer";


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodolistsState: Array<TodoListType> = []

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