import {setAppErrorAC, setAppStatusAC, } from "../app/app-reduser";
import {ResponseType} from "../api/todolistsAPI";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch:Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
        dispatch(setAppStatusAC({status:'failed'}))
    } else {
        dispatch(setAppErrorAC({error:'Some error occurred'}))
    }
}

export const handleServerNetworkError = (error: string, dispatch:Dispatch) => {
    dispatch(setAppStatusAC({status:'failed'}))
    dispatch(setAppErrorAC({error}))
}
