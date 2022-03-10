import {Dispatch} from "redux";
import {authAPI} from "../api/todolistsAPI";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false
}
const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: ErrorType }>) {
            state.error = action.payload.error
        },
        setAppInitialized(state, action: PayloadAction<{ value: boolean }>) {
            state.isInitialized = action.payload.value
        }
    }
})
export const appReducer = slice.reducer
export const {setAppStatusAC} = slice.actions
export const {setAppErrorAC} = slice.actions
export const {setAppInitialized} = slice.actions

//     (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case "APP/SET-INITIALIZED":
//             return {...state, isInitialized: action.value}
//         default:
//             return state
//     }
// }
// actions
//export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
//export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
//export const setAppInitialized = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)
// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
        }
        dispatch(setAppInitialized({value:true}))
    })
}
// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null


