import React from "react";
import { AppDecorator } from "../../stories";
import Map from "./";

export default {
    title: "Components|Map/Yandex",
    component: Map,
    decorators: [storyFn => <AppDecorator>{storyFn()}</AppDecorator>]
};

export const Default = () => {
    return <Map center={[53.849902, 27.69444]} zoom={10} type={"yandex#map"} />;
};
