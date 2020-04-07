import React from "react";
import NotFound from "./";
import {AppDecorator} from "../../stories";

export default {
    title: "Page|Not Found",
    component: NotFound,
    decorators: [storyFn => <AppDecorator>{storyFn()}</AppDecorator>]
};

export const Default = () => {
    return <NotFound/>;
};
