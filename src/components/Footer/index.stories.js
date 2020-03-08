import React from "react";
import Footer from "./";

export default {
    title: "Static|Footer",
    component: Footer,
    decorators: [storyFn => <div style={{ maxWidth: "1024px", margin: "0 auto" }}>{storyFn()}</div>]
};

export const Default = () => {
    return <Footer />;
};
