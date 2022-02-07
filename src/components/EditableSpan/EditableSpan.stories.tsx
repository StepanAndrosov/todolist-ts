import React from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";
import {Meta} from "@storybook/react";

export default {
    title: "Todolists/EditableSpan comp",
    component: EditableSpan
} as Meta

const cb = action("onChange Editable span")

export const EditableSpanStory = () => {
    return <EditableSpan title={"Double click me!"} onChange={cb} />
}
