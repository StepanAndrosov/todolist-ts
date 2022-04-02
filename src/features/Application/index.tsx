import * as appSelectors from '../../app/selectors'
import {slice, asyncActions} from "./application-reduser";

const appReducer = slice.reducer
const appActions = {
    ...asyncActions,
    ...slice.actions
}

export {
    appReducer,
    appActions,
    appSelectors
}
