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
            permissionStatus={{ superAdmin: true, admin: true }}
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
            permissionStatus={{ superAdmin: false, admin: false }}
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
            permissionStatus={{ superAdmin: false, admin: false }}
        />
    );
};

export const HeaderAnonymous = () => {
    return <Header isActive={true} hasDepartment={true} permissionStatus={{ superAdmin: false, admin: false }} />;
};

export const HeaderSuperAdmin = () => {
    return (
        <Header
            isActive={true}
            hasDepartment={true}
            name={"Maksim"}
            surName={"Razhnov"}
            avatar={avatar}
            permissionStatus={{
                superAdmin: true,
                admin: false
            }}
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
            permissionStatus={{ superAdmin: false, admin: true }}
        />
    );
};
