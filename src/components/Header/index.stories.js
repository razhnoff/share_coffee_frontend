import React from "react";
import Header from "./";

export default {
    title: "Components|Header",
    component: Header
};

const avatar = "https://content.onliner.by/news/970x485/b15e9c2f198ab2401f7751f43f6e9cfa.jpeg";

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
            hasDepartment={false}
            isActive={true}
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
            hasDepartment={true}
            isActive={true}
            avatar={avatar}
            name={"Maksim"}
            surName={"Razhnov"}
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
            permissionStatus={{
                superAdmin: true,
                admin: false
            }}
            avatar={avatar}
            name={"Maksim"}
            surName={"Razhnov"}
        />
    );
};

export const HeaderAdmin = () => {
    return (
        <Header
            isActive={true}
            hasDepartment={true}
            permissionStatus={{ superAdmin: false, admin: true }}
            avatar={avatar}
            name={"Maksim"}
            surName={"Razhnov"}
        />
    );
};
