import React from "react";
import ErrorMessage from "./";
import { BAN_MSG, ERROR_MSG } from "./constants";

export default {
    title: "Components|Error Message",
    component: ErrorMessage,
    decorators: [storyFn => <div style={{ maxWidth: "1024px", margin: "0 auto" }}>{storyFn()}</div>]
};

export const ErrorMsg = () => {
    return <ErrorMessage type={ERROR_MSG} value={"Something went wrong!"} />;
};

export const ErrorBan = () => {
    return <ErrorMessage type={BAN_MSG} value={"You are banned!"} />;
};
