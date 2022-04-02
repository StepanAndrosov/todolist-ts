import {TaskType, TodolistType} from "../../api/todolistsAPI";
import {RequestStatusType} from "../Application/types";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
