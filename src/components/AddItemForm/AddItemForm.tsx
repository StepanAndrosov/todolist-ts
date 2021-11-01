import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "./AddItemForm.module.css"
import { IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

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
    return <div className={style.AddItemForm}>
            <TextField error={!!error}
                       helperText={error}
                       label={"type value"}
                       variant={"outlined"}
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
            />
            <IconButton size={"small"} onClick={addTask} color={"primary"}>
                <Add />
            </IconButton>
    </div>
}