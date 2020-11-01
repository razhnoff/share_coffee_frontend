import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "./";
import { EVENT, DEFAULT, PRIMARY, UNSUBSCRIBE, SUBSCRIBE } from "../../constants";
import { ComponentsDecorator } from "../../stories";

export default {
    title: "Components|Button",
    component: Button,
    decorators: [storyFn => <ComponentsDecorator>{storyFn()}</ComponentsDecorator>]
};

export const Login = () => {
    return (
        <Button type={PRIMARY} onClick={action("You log in")}>
            {"Log in via Telegram"}
        </Button>
    );
};

export const Logout = () => {
    return (
        <Button type={DEFAULT} onClick={() => alert("Logout")}>
            {"Log out"}
        </Button>
    );
};

export const Subscribe = () => {
    return (
        <Button type={SUBSCRIBE} onClick={() => alert("Subscribed!")}>
            {"Subcribe"}
        </Button>
    );
};

export const Unsubscribe = () => {
    return (
        <Button type={UNSUBSCRIBE} onClick={() => alert("Unsubscribed")}>
            {"Unsubscribe"}
        </Button>
    );
};

export const DisableUnsubscribe = () => {
    return (
        <Button type={UNSUBSCRIBE} disabled onClick={() => alert("Disabled")}>
            {"Unsubscribe"}
        </Button>
    );
};

export const DisablePrimary = () => {
    return (
        <Button type={PRIMARY} disabled onClick={() => alert("Disabled")}>
            {"Accept"}
        </Button>
    );
};

export const EventsButton = () => {
    return (
        <Button type={EVENT} onClick={() => alert("click")}>
            {"My upcoming events 2"}
        </Button>
    );
};
