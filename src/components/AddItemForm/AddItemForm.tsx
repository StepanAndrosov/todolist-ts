import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "./AddItemForm.module.css"
import {IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

export type AddItemFormSubmitHelperType = { setError: (error: string) => void, setTitle: (title: string) => void }
type AddItemFormType = {
    addItem: (title: string, helper: AddItemFormSubmitHelperType) => void
    disabled?: boolean
}
export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === "Enter") {
            if (title.trim() === "") {
                setError("Title is required")
                return
            }
            addItem(title.trim(), {setError, setTitle})
            setTitle("")
        }
    }
    const addTask = async () => {
        if (title.trim() === "") {
            setError("Title is required")
            return
        }
        try {
            await addItem(title.trim(), {setError, setTitle})
            setTitle("")
        } catch (error: any) {
            setError(error.message)
        }
    }
    return <div className={style.AddItemForm}>
        <TextField error={!!error}
                   disabled={disabled}
                   helperText={error}
                   label={"type value"}
                   variant={"outlined"}
                   value={title}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
        />
        <IconButton size={"small"} onClick={addTask} color={"primary"} disabled={disabled}>
            <Add/>
        </IconButton>
    </div>
})
