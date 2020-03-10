import React from "react";
import { CustomDecorator } from "../../stories";
import Preloader from "./";

export default {
    title: "Components|Preloader",
    component: Preloader,
    decorators: [storyFn => <CustomDecorator>{storyFn()}</CustomDecorator>]
};

export const Default = () => {
    return <Preloader />;
};
