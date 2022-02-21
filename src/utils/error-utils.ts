import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../app/app-reduser";
import {ResponseType} from "../api/todolistsAPI";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch:Dispatch<SetAppStatusAT | SetAppErrorAT>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStatusAC('failed'))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
}

export const handleServerNetworkError = (error: string, dispatch:Dispatch<SetAppStatusAT | SetAppErrorAT>) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error))
}
