import React from "react";
import { AppDecorator } from "../../stories";
import Header from "./";

export default {
    title: "Components|Header",
    component: Header,
    decorators: [storyFn => <AppDecorator>{storyFn()}</AppDecorator>]
};

const avatar = "https://avatars1.githubusercontent.com/u/8328764?s=460&v=4";

export const Default = () => {
    return (
        <Header
            isActive={false}
            hasDepartment={false}
            name={"Maksim"}
            surName={"Razhnov"}
            avatar={avatar}
            permission={2}
        />
    );
};

export const HeaderDepartment = () => {
    return (
        <Header
            isActive={true}
            hasDepartment={false}
            name={"Maksim"}
            surName={"Razhnov"}
            avatar={avatar}
            permission={0}
        />
    );
};

export const HeaderUser = () => {
    return (
        <Header
            isActive={true}
            hasDepartment={true}
            name={"Maksim"}
            surName={"Razhnov"}
            avatar={avatar}
            permission={0}
        />
    );
};

export const HeaderAnonymous = () => {
    return <Header isActive={true} hasDepartment={true} permission={0} />;
};

export const HeaderSuperAdmin = () => {
    return (
        <Header
            isActive={true}
            hasDepartment={true}
            name={"Maksim"}
            surName={"Razhnov"}
            avatar={avatar}
            permission={2}
        />
    );
};

export const HeaderAdmin = () => {
    return (
        <Header
            isActive={true}
            hasDepartment={true}
            name={"Maksim"}
            surName={"Razhnov"}
            avatar={avatar}
            permission={1}
        />
    );
};
