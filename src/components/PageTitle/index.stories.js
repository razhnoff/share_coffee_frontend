import React from "react";
import { AppDecorator } from "../../stories";
import PageTitle from "./";

export default {
    title: "Components|Page Title",
    component: PageTitle,
    decorators: [storyFn => <AppDecorator>{storyFn()}</AppDecorator>]
};

export const Default = () => {
    return <PageTitle title="Get your own kick off" description="with Wargaming S&C" />;
};
