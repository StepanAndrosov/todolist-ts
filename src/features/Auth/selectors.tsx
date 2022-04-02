import {AppRootState} from "../Application/types";

export const selectIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn
