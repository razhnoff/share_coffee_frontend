import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { removeCookie, getCookie } from "tiny-cookie";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import defaultUser from "../../assets/icons/defaultUser.png";
import Button from "../Button";
import { DEFAULT } from "../Button/constants";
import EventsDropDown from "../EventsDropdown";
import { SERVER } from "../../constants";
import { checkerProp } from "../../helpers/helpers";
import "./scss/Header.scss";

const getUpcomingEvents = userId => {
    const token = getCookie("token");
    const obj = {
        method: "get",
        url: `${SERVER}/users/${userId}/upcoming`,
        headers: {
            Authorization: `Bearer ${token}`,
            mode: "cors",
            "Content-Type": "application/json"
        }
    };
    return axios(obj)
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
            return err;
        });
};

const logOut = location => {
    sessionStorage.clear();
    removeCookie("token", {
        domain: "random-coffee.fun"
    });
    location.history.replace("/");
};

const AdminNavigation = ({ avatar, fullName, location }) => {
    return (
        <div className="header-nav">
            <img className="header-user__img" src={avatar} alt="avatar" />
            <span className="header-user__info">{fullName}</span>
            <Button type={DEFAULT} onClick={() => logOut(location)}>
                {"Log out"}
            </Button>
        </div>
    );
};

const UserNavigation = ({ avatar, name, surName, events, location, hasDepartment }) => {
    if (checkerProp(avatar)) {
        avatar = defaultUser;
    }

    const fullName = checkerProp(name) || checkerProp(surName) ? "User" : `${name} ${surName}`;

    return (
        <Fragment>
            {hasDepartment ? (
                <div>
                    <div className="header-nav">
                        <img className="header-user__img" src={avatar} alt="avatar" />
                        <span className="header-user__info">{fullName}</span>
                        <Button type={DEFAULT} onClick={() => logOut(location)}>
                            {"Log out"}
                        </Button>
                    </div>
                    <div className="header__dropdown">
                        <EventsDropDown data={events} />
                    </div>
                </div>
            ) : (
                <div className="header-nav">
                    <Button type={DEFAULT} onClick={() => logOut(location)}>
                        {"Log out"}
                    </Button>
                </div>
            )}
        </Fragment>
    );
};

const HeaderNavigation = ({ hasDepartment, name, surName, location, events, avatar, permissionStatus }) => {
    if (permissionStatus.superAdmin) {
        return <AdminNavigation location={location} />;
    }

    const fullName = `${name} ${surName}`;

    if (permissionStatus.admin) {
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

const Header = ({ name, isActive, avatar, surName, location, hasDepartment, permissionStatus }) => {
    const [events, setUserEvents] = useState([]);

    useEffect(() => {
        const hasId = checkerProp(sessionStorage.getItem("id"));
        const fetchData = async () => {
            if (!hasId) {
                const result = await getUpcomingEvents(sessionStorage.getItem("id"));
                setUserEvents(result.data.data);
            } else {
                setUserEvents([]);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="header">
            <div className="header__container">
                <div className="logo_header">
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
                        permissionStatus={permissionStatus}
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
    permissionStatus: PropTypes.shape({
        admin: PropTypes.bool,
        superAdmin: PropTypes.bool
    }).isRequired
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
