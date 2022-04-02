import {asyncActions as tasksAsyncActions, slice as tasksSlice} from './tasks-reducer'


const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}


const tasksReducer = tasksSlice.reducer

export {
    tasksReducer,
    tasksActions,
}
