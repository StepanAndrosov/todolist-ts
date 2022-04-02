import {rootReducer, store} from "../../app/store";
import {FieldErrorType} from "../../api/todolistsAPI";

export type AppDispatchType = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
export type RootReducerType = typeof rootReducer
export type AppRootState = ReturnType<typeof rootReducer>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null
