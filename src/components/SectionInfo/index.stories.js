import React from "react";
import { AppDecorator } from "../../stories";
import SectionInfo from "./";

export default {
    title: "Components|Section Info",
    component: SectionInfo,
    decorators: [storyFn => <AppDecorator>{storyFn()}</AppDecorator>]
};

export const Default = () => {
    return <SectionInfo value={"Use Telegram to be aware of upcoming meets and manage subscriptions:"} />;
};
