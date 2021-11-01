import { userReducer} from "./user-reducer";

test("user reducer should increment age", () => {
    const startState = {age:20, childrenCount: 2, name: "Pit"}

    const endState = userReducer(startState, {type:"INCREMENT_AGE"})
    const endStateWithAdd = userReducer(startState, {type:"INCREMENT_AGE", add: 5})
    expect(endState.age).toBe(21)
    expect(endStateWithAdd.age).toBe(25)
    expect(endState.childrenCount).toBe(2)
    expect(endStateWithAdd.childrenCount).toBe(2)
})

test("user reducer should increment children", () => {
    const startState = {age:20, childrenCount: 2, name: "Pit"}

    const endState = userReducer(startState, {type:"INCREMENT-CHILDREN-COUNT"})
    const endStateWithAdd = userReducer(startState, {type:"INCREMENT-CHILDREN-COUNT", add: 5})

    expect(endState.childrenCount).toBe(3)
    expect(endStateWithAdd.childrenCount).toBe(7)
    expect(endState.age).toBe(20)
    expect(endStateWithAdd.age).toBe(20)
})

test("user reducer should change name of user", () => {
    const startState = {age:20, childrenCount: 2, name: "Pit"}
    const newName = "Guilfoyle"
    const endState = userReducer(startState, {type:"CHANGE-NAME", newName})

    expect(endState.name).toBe(newName)

})