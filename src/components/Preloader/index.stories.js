import React from "react";
import { AppDecorator } from "../../stories";
import Preloader from "./";

export default {
    title: "Components|Preloader",
    component: Preloader,
    decorators: [storyFn => <AppDecorator>{storyFn()}</AppDecorator>]
};

export const Default = () => {
    return <Preloader />;
};
