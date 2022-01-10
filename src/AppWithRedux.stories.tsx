import React from 'react';
import {AppWithRedux} from "./AppWithRedux";
import {ReduxStoreDecorator} from "./stories/decorators/ReduxStoreDecorator";
import {Meta} from "@storybook/react";


export default {
    title: "Todolist/AppWithRedux",
    component: AppWithRedux,
    decorators: [ReduxStoreDecorator]
} as Meta



export const AppWithReduxStories = () => {
    return <AppWithRedux/>
}


