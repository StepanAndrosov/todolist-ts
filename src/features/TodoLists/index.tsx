import {asyncActions as tasksAsyncActions} from './tasks-reducer'
import { TodoLists } from './TodoLists'
import {asyncActions as todoListsAsyncActions} from './todolists-reducer'
import {slice} from './todolists-reducer'

const todoListsActions = {
    ...todoListsAsyncActions,
    ...slice.actions
}
const tasksActions = {
    ...tasksAsyncActions,
}

export {
    tasksActions,
    todoListsActions,
    TodoLists
}
