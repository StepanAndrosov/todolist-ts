import {authAPI} from "../../api/todolistsAPI";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ErrorType, RequestStatusType} from "./types";
import {setAppError, setAppStatus} from "./ApplicationCommonAction";
import {authActions} from "../Auth"

const {setIsLoggedIn} = authActions

const initializeApp = createAsyncThunk('application/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({value: true}))
    }
})

export const asyncActions = {
    initializeApp
}

export const slice = createSlice({
    name: "application",
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as ErrorType,
        isInitialized: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })
        builder.addCase(setAppStatus, (state, action) => {
            state.status = action.payload.status
        })
        builder.addCase(setAppError, (state, action) => {
            state.error = action.payload.error
        })
    }
})



