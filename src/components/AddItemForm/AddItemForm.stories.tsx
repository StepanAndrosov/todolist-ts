import React from 'react'
import {AddItemForm} from "./AddItemForm"
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";


export default {
    title: "Todolist/AddItemForm comp",
    component: AddItemForm
} as ComponentMeta<typeof AddItemForm>


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />

export const AddItemFormBase = Template.bind({})

const addTodoListAsync = async (title: string) => action( title)

AddItemFormBase.args = {
    addItem: addTodoListAsync("Button clicked inside the form") as any
}

export const AddItemFormDisabled = Template.bind({})

AddItemFormDisabled.args = {
    addItem: addTodoListAsync("") as any,
    disabled: true
}
