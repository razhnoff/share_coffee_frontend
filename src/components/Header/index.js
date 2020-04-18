import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import Api from "../../services/api";
import { removeCookie } from "tiny-cookie";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import defaultUser from "../../assets/icons/defaultUser.png";
import Button from "../Button";
import { DEFAULT } from "../Button/constants";
import EventsDropDown from "../EventsDropdown";
import { checkerProp } from "../../helpers/helpers";
import styles from "./scss/Header.module.scss";
import { isEmpty } from "lodash-es";

const logOut = location => {
    const domain = process.env.NODE_ENV === "development" ? "localhost" : "";

    localStorage.clear();
    removeCookie("token", {
        domain
    });
    location.history.push("/");
};

const AdminNavigation = ({ avatar, fullName, location }) => {
    return (
        <div className={styles.header_nav}>
            <img className={styles.header_user__img} src={avatar} alt="avatar" />
            <span className={styles.header_user__info}>{fullName}</span>
            <Button type={DEFAULT} onClick={() => logOut(location)}>
                {"Log out"}
            </Button>
        </div>
    );
};

const UserNavigation = ({ avatar, name, surName, events, location, hasDepartment }) => {
    // if (checkerProp(avatar)) {
    //     avatar = defaultUser;
    // }

    const fullName = checkerProp(name) || checkerProp(surName) ? "User" : `${name} ${surName}`;

    return (
        <Fragment>
            {hasDepartment ? (
                <div>
                    <div className={styles.header_nav}>
                        <img className={styles.header_user__img} src={avatar} alt="avatar" />
                        <span className={styles.header_user__info}>{fullName}</span>
                        <Button type={DEFAULT} onClick={() => logOut(location)}>
                            {"Log out"}
                        </Button>
                    </div>
                    <div className={styles.header__dropdown}>
                        <EventsDropDown data={events} />
                    </div>
                </div>
            ) : (
                <div className={styles.header_nav}>
                    <Button type={DEFAULT} onClick={() => logOut(location)}>
                        {"Log out"}
                    </Button>
                </div>
            )}
        </Fragment>
    );
};

const HeaderNavigation = ({ hasDepartment, name, surName, location, events, avatar, permission }) => {
    if (permission === 2) {
        return <AdminNavigation location={location} />;
    }

    const fullName = `${name} ${surName}`;

    if (permission === 1) {
        return <AdminNavigation fullName={fullName} location={location} avatar={avatar} />;
    }

    return (
        <UserNavigation
            hasDepartment={hasDepartment}
            name={name}
            avatar={avatar}
            surName={surName}
            location={location}
            events={events}
        />
    );
};

const Header = ({ name, isActive, avatar, surName, location, hasDepartment, permission }) => {
    const [events, setUserEvents] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("_id");

        if (isEmpty(userId)) {
            console.log("Empty user id");
            return;
        }

        const fetchData = async () => {
            const response = await Api.getUpcomingEvents(userId);

            setUserEvents(response.data.data);
        };

        fetchData();
    }, []);

    return (
        <div className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.logo_header}>
                    <Link to="/" title="Home">
                        <img src={logo} alt="coffee" />
                    </Link>
                    <span>SHARE & COFFEE</span>
                </div>
                {isActive && (
                    <HeaderNavigation
                        name={name}
                        hasDepartment={hasDepartment}
                        surName={surName}
                        events={events}
                        avatar={avatar}
                        location={location}
                        permission={permission}
                    />
                )}
            </div>
        </div>
    );
};

AdminNavigation.propTypes = {
    location: PropTypes.object,
    avatar: PropTypes.string,
    fullName: PropTypes.string
};

AdminNavigation.defaultProps = {
    avatar: defaultUser,
    fullName: "Admin"
};

UserNavigation.propTypes = {
    ...AdminNavigation.propTypes,
    surName: PropTypes.string,
    events: PropTypes.array,
    hasDepartment: PropTypes.bool
};

UserNavigation.defaultProp = {
    avatar: defaultUser
};

HeaderNavigation.propTypes = {
    ...UserNavigation.propTypes,
    permission: PropTypes.number.isRequired
};

Header.propTypes = {
    ...UserNavigation.propTypes,
    ...HeaderNavigation.propTypes,
    isActive: PropTypes.bool
};

Header.defaultProps = {
    isActive: false
};

export default Header;
