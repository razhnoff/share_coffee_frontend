import React from "react";
import PropTypes from "prop-types";

const EventName = ({ eventName }) => {
    return <div className="eventName">{eventName}</div>;
};

EventName.propTypes = {
    eventName: PropTypes.string
};

export default EventName;
