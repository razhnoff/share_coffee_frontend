import React, { useState } from "react";
import PropTypes from "prop-types";
import List from "./List";
import "./scss/EventsDropdown.scss";

/**
 * Dropdown component for showing user events
 * @param events (array of label-value objects)
 * example:
 * [{name: "name1", place: "place1", time:"1st September"}, {name: "name2", place: "place2", time:"1st September"}]
 */
const ARROW_ICON = "↓";

const EventsDropdown = ({ data }) => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div
            className="event-list_container"
            onMouseLeave={() => {
                setIsOpened(false);
            }}>
            <button
                className="event-header"
                onClick={() => {
                    setIsOpened(!isOpened);
                }}>
                <span>My upcoming events ({data.length})</span>
                <span className={`event-arrow ${isOpened ? "event-rotated" : ""}`}>{ARROW_ICON}</span>
            </button>
            {isOpened && <List data={data} />}
        </div>
    );
};

EventsDropdown.propTypes = {
    data: PropTypes.array.isRequired
};

EventsDropdown.defaultProps = {
    data: []
};

export default EventsDropdown;
