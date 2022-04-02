import { Login } from './Login'
import * as authSelectors from './selectors'
import {asyncActions as authAsyncActions} from "./auth-reducer";
import {slice} from "./auth-reducer";

const authReducer = slice.reducer

const authActions = {
    ...authAsyncActions,
    ...slice.actions
}

export {
    authSelectors,
    authReducer,
    authActions,
    Login
}
