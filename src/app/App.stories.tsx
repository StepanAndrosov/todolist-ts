import React from 'react';
import {App} from "./App";
import {BrowserRouterDecorator, ReduxStoreDecorator} from "../stories/decorators/ReduxStoreDecorator";
import {Meta} from "@storybook/react";

export default {
    title: "Todolist/Application",
    component: App,
    decorators: [ReduxStoreDecorator, BrowserRouterDecorator]
} as Meta

export const AppStories = () => {
    return <App demo={true}  />
}


