import React from "react";
import { ComponentsDecorator } from "../../stories";
import Map from "./";

export default {
    title: "Components|Map/Yandex",
    component: Map,
    decorators: [storyFn => <ComponentsDecorator>{storyFn()}</ComponentsDecorator>]
};

export const Default = () => {
    return <Map location={[53.849902, 27.69444]} zoom={10} type={"yandex#map"} />;
};
