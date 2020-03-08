import React from "react";
import PropTypes from "prop-types";
import { timeConverter, letterTransform, checkerProp, secConverter } from "../../../helpers/helpers";

const COUNT_OF_ITEMS_TO_SHOW = 3;

const List = ({ data }) => {
    const userEvents = [...data];
    userEvents.sort((a, b) => {
        return a.date - b.date;
    });
    return (
        <div className="list">
            {data.length === 0 ? (
                <ul className="event-List" key={data.length}>
                    <div className="event-item">
                        <h4 className="event_title">No confirmed events</h4>
                        <p className="event_place">Check your telegram account</p>
                    </div>
                </ul>
            ) : (
                <ul className="event-List">
                    {userEvents.map((item, id) => {
                        if (id < COUNT_OF_ITEMS_TO_SHOW) {
                            return (
                                <div className="event-item" key={id}>
                                    <h4 className="event_title">
                                        {checkerProp(item.topic.title)
                                            ? "Default title"
                                            : letterTransform(item.topic.title)}
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
            )}
        </div>
    );
};

List.propTypes = {
    data: PropTypes.array
};

List.defaultProps = {
    data: []
};

export default List;
