import React from 'react';
import {App} from "./App";
import {ReduxStoreDecorator} from "../stories/decorators/ReduxStoreDecorator";
import {Meta} from "@storybook/react";


export default {
    title: "Todolists/App",
    component: App,
    decorators: [ReduxStoreDecorator]
} as Meta



export const AppStories = () => {
    return <App />
}


