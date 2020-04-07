import React, { useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash-es";
import "./scss/EventsDropdown.scss";
import Button from "../Button";
import { EVENT } from "../Button/constants";
import { checkerProp, letterTransform, secConverter, timeConverter } from "../../helpers/helpers";

const ARROW_ICON = "↓";

/**
 * Dropdown component for showing user events
 * @params
 * 1) data (array of objects)
 * 2) maxCountEvents (number)
 * Example:
 *  [{ topic: { title: "Platform Back-end", address: "@ Latte Python 12 Zybitskaya St., Minsk" }, date: 1883683088000 }]
 */

const EventsDropdown = ({ data, maxCountEvents }) => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div
            className="event-list_container"
            onMouseLeave={() => {
                setIsOpened(false);
            }}>
            <Button type={EVENT} onClick={() => setIsOpened(!isOpened)}>
                <span>My upcoming events ({data.length})</span>
                <span className={`event-arrow ${isOpened ? "event-rotated" : ""}`}>{ARROW_ICON}</span>
            </Button>
            {isOpened && (
                <div className="list">
                    {isEmpty(data) ? getZeroEventsView() : getEventsView(getSortedListByDate(data), maxCountEvents)}
                </div>
            )}
        </div>
    );
};

EventsDropdown.propTypes = {
    data: PropTypes.array.isRequired,
    maxCountEvents: PropTypes.number.isRequired
};

EventsDropdown.defaultProps = {
    data: [],
    maxCountEvents: 3
};

function getSortedListByDate(arr) {
    return [...arr].sort((a, b) => {
        return a.date - b.date;
    });
}

function getZeroEventsView() {
    return (
        <ul className="event-List">
            <div className="event-item">
                <h4 className="event_title">No confirmed events</h4>
                <p className="event_hint">Check your telegram account</p>
            </div>
        </ul>
    );
}

function getEventsView(events, maxCountEvents) {
    return (
        <ul className="event-List">
            {events.map((item, id) => {
                if (id < maxCountEvents) {
                    return (
                        <div className="event-item" key={id}>
                            <h4 className="event_title">
                                {checkerProp(item.topic.title) ? "Default title" : letterTransform(item.topic.title)}
                            </h4>
                            <p className="event_place">
                                {checkerProp(item.topic.address) ? "Default address" : item.topic.address}
                            </p>
                            <p className="event_time">
                                {checkerProp(item.date)
                                    ? "Default date"
                                    : `${timeConverter(item.date)} - ${secConverter(item.date)}`}
                            </p>
                        </div>
                    );
                } else {
                    return <></>;
                }
            })}
        </ul>
    );
}

export default EventsDropdown;
