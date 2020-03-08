import React from "react";
import Dropdown from "./";

export default {
    title: "Components|Dropdown",
    component: Dropdown
};

export const Default = () => {
    const options = [
        { label: "Accounts", value: 0 },
        { label: "Tracking Engine", value: 1 },
        { label: "PRMP", value: 2 },
        { label: "DevOps", value: 3 }
    ];

    return <Dropdown options={options} />;
};
