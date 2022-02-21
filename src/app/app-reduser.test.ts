import {appReducer, ErrorType, RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reduser";

type InitialType = {
    status: RequestStatusType,
    error: ErrorType
}
const initialState: InitialType = {
    status: 'idle',
    error: null
}
test( 'correct error message should be set',() => {
    const err1 = 'some error'
    const err2 = 'error'
    const endState1 = appReducer(initialState, setAppErrorAC(err1))
    const endState2 = appReducer(initialState, setAppErrorAC(err2))
    expect(endState1.error).toBe(err1)
    expect(endState2.error).toBe(err2)
})
test( 'correct status should be set',() => {
    const endState1 = appReducer(initialState, setAppStatusAC('loading'))
    const endState2 = appReducer(initialState, setAppStatusAC('succeeded'))
    expect(endState1.status).toBe('loading')
    expect(endState2.status).toBe('succeeded')
})
