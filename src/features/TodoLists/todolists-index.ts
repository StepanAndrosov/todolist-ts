import {asyncActions, slice} from "./todolists-reducer";

export const todolistsReducer = slice.reducer

export const todoListsActions = {
    ...asyncActions,
    ...slice.actions
}
