type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionsType = "INCREMENT_AGE" | "INCREMENT-CHILDREN-COUNT" | "CHANGE-NAME"

type ActionType = {
    type: ActionsType
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "INCREMENT_AGE":
            return {
                ...state,
                age: state.age + (action.add || 1)
            }
        case "INCREMENT-CHILDREN-COUNT":
            return {
                ...state,
                childrenCount: state.childrenCount + (action.add || 1)
            }
        case "CHANGE-NAME":
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error(`i can't read this action: ${action.type}`)
    }
}