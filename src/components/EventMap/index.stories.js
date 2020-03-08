import React from "react";
import Map from "./";

export default {
    title: "Components|Map",
    component: Map
};

export const Default = () => {
    return <Map location={[55.75, 37.57]} zoom={10} type={"leaflet/yandex"} />;
};
