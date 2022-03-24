import {AppRootState} from "./store";

export const selectStatus = (state: AppRootState) => state.app.status
export const selectInitialized = (state: AppRootState) => state.app.isInitialized

