import {AppRootState} from "../features/Application/types";

export const selectStatus = (state: AppRootState) => state.app.status
export const selectInitialized = (state: AppRootState) => state.app.isInitialized

