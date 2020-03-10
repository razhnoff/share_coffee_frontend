import React from "react";
import { AppDecorator } from "../../stories";
import ErrorMessage from "./";
import { BAN_MSG, ERROR_MSG } from "./constants";

export default {
    title: "Components|Error Message",
    component: ErrorMessage,
    decorators: [storyFn => <AppDecorator>{storyFn()}</AppDecorator>]
};

export const ErrorMsg = () => {
    return <ErrorMessage type={ERROR_MSG} value={"Something went wrong!"} />;
};

export const ErrorBan = () => {
    return <ErrorMessage type={BAN_MSG} value={"You are banned!"} />;
};
