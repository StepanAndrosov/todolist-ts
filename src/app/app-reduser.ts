import {Dispatch} from "redux";
import {authAPI} from "../api/todolistsAPI";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}
// actions
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitialized = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)
// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))

        } else {

        }
        dispatch(setAppInitialized(true))
    })
}
// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
type InitialStateType = typeof initialState
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
type ActionsType =
    | SetAppStatusAT
    | SetAppErrorAT
    | ReturnType<typeof setAppInitialized>
