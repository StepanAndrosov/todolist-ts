import {setAppError, setAppStatus,} from "../app/app-reduser";
import {ResponseType} from "../api/todolistsAPI";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>,
                                        dispatch: Dispatch,
                                        showError = true
) => {
    if (showError) {
        dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: string,
                                         dispatch: Dispatch,
                                         showError = true
) => {
    if (showError) {
        dispatch(setAppError({error}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}
