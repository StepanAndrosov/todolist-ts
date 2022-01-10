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

AddItemFormBase.args = {
    addItem: action("Button clicked inside the form")
}
