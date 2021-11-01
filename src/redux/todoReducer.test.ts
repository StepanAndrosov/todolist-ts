
import {todoReducer} from "./todoReducer";

test(" ", () => {
    const startState = {age:20, childrenCount: 2, name: "Pit"}

    const endState = todoReducer(startState, {type:"INCREMENT_AGE"})

    expect(endState.age).toBe(21)
})