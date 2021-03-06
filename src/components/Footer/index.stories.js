import React from "react";
import { AppDecorator } from "../../stories";
import Footer from "./";

export default {
    title: "Static|Footer",
    component: Footer,
    decorators: [storyFn => <AppDecorator>{storyFn()}</AppDecorator>]
};

export const Default = () => {
    return <Footer />;
};
