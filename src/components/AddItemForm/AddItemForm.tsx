import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "./AddItemForm.module.css"
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            if (newTaskTitle.trim() === "") {
                setError("Title is required")
                return
            }
            addItem(newTaskTitle.trim())
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return
        }
        addItem(newTaskTitle.trim())
        setNewTaskTitle("")
    }
    return <div className={style.AddItemForm}>
        <TextField error={!!error}
                   disabled={disabled}
                   helperText={error}
                   label={"type value"}
                   variant={"outlined"}
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
        />
        <IconButton size={"small"} onClick={addTask} color={"primary"} disabled={disabled}>
            <Add />
        </IconButton>
    </div>
})
