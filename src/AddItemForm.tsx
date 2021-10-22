import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "./Todolist/Todolist.module.scss";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            if (newTaskTitle.trim() === "") {
                setError("Title is required")
                return
            }
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return
        }
        props.addItem(newTaskTitle.trim())
        setNewTaskTitle("")
    }
    return <div>
        <input className={error ? style.error : ""}
               value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={style.errorMessage}>{error}</div>}
    </div>
}