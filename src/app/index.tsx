import * as appSelectors from './selectors'
import {asyncActions as appAsyncActions} from './app-reduser'

const appActions = {
    ...appAsyncActions
}

export {
    appSelectors,
    appActions
}
