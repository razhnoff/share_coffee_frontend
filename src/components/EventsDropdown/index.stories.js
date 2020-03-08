import React from "react";
import EventsDropdown from "./";

export default {
    title: "Components|Events Dropdown",
    component: EventsDropdown
};

export const Default = () => {
    const EVENTS_MOCK = [
        {
            topic: {
                title: "Platform Front-end",
                address: "@ Latte Python 12 Zybitskaya St., Minsk"
            },
            date: 1583683088000
        },
        {
            topic: {
                title: "Platform Back-end",
                address: "@ Latte Python 12 Zybitskaya St., Minsk"
            },
            date: 1583683088000
        },
        {
            topic: {
                title: "Platform Back-end",
                address: "@ Latte Python 12 Zybitskaya St., Minsk"
            },
            date: 1583683088000
        }
        // {
        //     topic: {
        //         title: "Platform Back-end",
        //         address: "@ Latte Python 12 Zybitskaya St., Minsk"
        //     },
        //     date: 1583683088000
        // }
    ];
    return <EventsDropdown data={EVENTS_MOCK} />;
};
