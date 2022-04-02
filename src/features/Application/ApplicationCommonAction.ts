import {createAction} from "@reduxjs/toolkit";
import {ErrorType, RequestStatusType} from "./types";

export const setAppStatus = createAction<{ status: RequestStatusType }>('app/setAppStatus')
export const setAppError = createAction<{ error: ErrorType }>('app/setAppError')
