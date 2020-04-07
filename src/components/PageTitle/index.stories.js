import React from "react";
import { ComponentsDecorator } from "../../stories";
import PageTitle from "./";

export default {
    title: "Components|Page Title",
    component: PageTitle,
    decorators: [storyFn => <ComponentsDecorator style={{ flexDirection: "column" }}>{storyFn()}</ComponentsDecorator>]
};

export const Default = () => {
    return <PageTitle title="Get your own kick off" description="with Wargaming S&C" />;
};
