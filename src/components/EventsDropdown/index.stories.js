import React from "react";
import { ComponentsDecorator } from "../../stories";
import EventsDropdown from "./";

export default {
    title: "Components|Events Dropdown",
    component: EventsDropdown,
    decorators: [storyFn => <ComponentsDecorator>{storyFn()}</ComponentsDecorator>]
};

const EVENTS_MOCK = [
    {
        topic: {
            title: "Platform Front-end",
            address: "@ Latte Python 12 Zybitskaya St., Minsk"
        },
        date: 1586683088000
    },
    {
        topic: {
            title: "Platform Back-end",
            address: "@ Latte Python 12 Zybitskaya St., Minsk"
        },
        date: 1883683088000
    },
    {
        topic: {
            title: "Platform DevOps",
            address: "@ Latte Python 12 Zybitskaya St., Minsk"
        },
        date: 1083683088000
    }
];

export const Default = () => {
    return <EventsDropdown data={EVENTS_MOCK} maxCountEvents={3} />;
};

export const ZeroEvents = () => {
    return <EventsDropdown data={[]} maxCountEvents={4} />;
};

export const BiggerThanMaxCount = () => {
    return <EventsDropdown data={EVENTS_MOCK} maxCountEvents={2} />;
};
