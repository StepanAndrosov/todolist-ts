import {ErrorType, RequestStatusType} from "./types";
import {setAppError, setAppStatus} from "./ApplicationCommonAction";
import {appReducer} from "./index";


type InitialType = {
    status: RequestStatusType,
    error: ErrorType
    isInitialized: boolean
}
const initialState: InitialType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
test( 'correct error message should be set',() => {
    const err1 = 'some error'
    const err2 = 'error'
    const endState1 = appReducer(initialState, setAppError({error:err1}))
    const endState2 = appReducer(initialState, setAppError({error:err2}))
    expect(endState1.error).toBe(err1)
    expect(endState2.error).toBe(err2)
})
test( 'correct status should be set',() => {
    const endState1 = appReducer(initialState, setAppStatus({status:'loading'}))
    const endState2 = appReducer(initialState, setAppStatus({status:'succeeded'}))
    expect(endState1.status).toBe('loading')
    expect(endState2.status).toBe('succeeded')
})
test( 'app isInitialized should be set',() => {

    // const endState1 = appReducer(initialState, asyncActions.initializeApp.fulfilled())
    //
    // expect(endState1.isInitialized).toBe(true)
})
