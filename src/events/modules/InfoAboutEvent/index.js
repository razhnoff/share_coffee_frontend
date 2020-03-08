import React from "react";
import PropTypes from "prop-types";

const InfoAboutEvent = ({ adress, eventFrequency }) => {
    return (
        <div className="info-About-Event">
            <div className="info-row">
                <p className="info-title">Place:</p>
                <span>{adress}</span>
            </div>
            <div className="info-row">
                <p className="info-title">Time:</p>
                <span className="time-desc">{eventFrequency}</span>
            </div>
        </div>
    );
};

InfoAboutEvent.propTypes = {
    adress: PropTypes.string,
    eventFrequency: PropTypes.string
};

export default InfoAboutEvent;
