import React, { useState } from "react";
import Dropdown from "./";
import { ComponentsDecorator } from "../../stories";

export default {
    title: "Components|Dropdown",
    component: Dropdown,
    decorators: [storyFn => <ComponentsDecorator>{storyFn()}</ComponentsDecorator>]
};

export const Default = () => {
    const [selectedValue, setSelection] = useState(null);

    const options = [
        { label: "Accounts", id: 0 },
        { label: "Tracking Engine", id: 1 },
        { label: "PRMP", id: 2 },
        { label: "DevOps", id: 3 }
    ];

    return <Dropdown options={options} value={selectedValue} onChange={setSelection} />;
};
